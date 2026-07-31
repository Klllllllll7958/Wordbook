/**
 * FSRS v5 — Free Spaced Repetition Scheduler
 * 轻量实现，基于 open-spaced-repetition 官方算法
 *
 * 核心参考：
 *   https://github.com/open-spaced-repetition/fsrs4anki/wiki/The-Algorithm
 *   https://github.com/open-spaced-repetition/free-spaced-repetition-scheduler
 *
 * 三变量记忆模型 (DSR)：
 *   R (Retrievability) — 可提取性，当前能回忆起此单词的概率 (0~1)
 *   S (Stability)      — 记忆稳定性，R 从 100% 降到 90% 需要的天数
 *   D (Difficulty)     — 难度，单词本身的复杂度 (1~10)
 *
 * 评分等级：
 *   1 = Again (忘记)  — 完全想不起来，重置记忆
 *   2 = Hard  (困难)  — 想起来了但很吃力
 *   3 = Good  (正常)  — 顺利想起
 *   4 = Easy  (简单)  — 毫不费力（本应用只使用 1-3）
 */

const FSRS = (function () {
    'use strict';

    // ============================================================
    // 默认参数 (FSRS v5, 19 parameters)
    // 来源: open-spaced-repetition 官方默认值
    // ============================================================
    const DEFAULT_W = [
        0.40255,   // w[0]
        1.18385,   // w[1]
        3.173,     // w[2]
        15.69105,  // w[3]
        7.1949,    // w[4]
        0.5345,    // w[5]
        1.4604,    // w[6]
        0.0046,    // w[7]
        1.54575,   // w[8]
        0.1192,    // w[9]
        1.01925,   // w[10]
        1.9395,    // w[11]
        0.11,      // w[12]
        0.29605,   // w[13]
        2.2698,    // w[14]
        0.2315,    // w[15]
        2.9898,    // w[16]
        0.51655,   // w[17]
        0.6621     // w[18]
    ];

    const REQUEST_RETENTION = 0.9;   // 目标保持率 90%
    const MAXIMUM_INTERVAL = 36500;  // 最大间隔天数 (~100年)
    const DECAY = -0.5;              // 遗忘曲线衰减因子
    const FACTOR = 19 / 81;         // 使 R(S, S) = 0.9 的归一化因子

    // ============================================================
    // 遗忘曲线：计算当前可提取性 R
    // R(t, S) = (1 + FACTOR * t / S)^DECAY
    // ============================================================
    function retrievability(elapsedDays, stability) {
        if (stability <= 0) return 0;
        return Math.pow(1 + FACTOR * elapsedDays / stability, DECAY);
    }

    // ============================================================
    // 首次复习：根据评分计算初始难度 D
    // D₀(G) = w₄ - e^(w₅ × (G − 1)) + 1
    // ============================================================
    function initDifficulty(w, rating) {
        return w[4] - Math.exp(w[5] * (rating - 1)) + 1;
    }

    // ============================================================
    // 首次复习：根据评分计算初始稳定性 S
    // S₀(G) = w[G−1]   (直接用对应参数)
    // ============================================================
    function initStability(w, rating) {
        return Math.max(w[rating - 1], 0.1);
    }

    // ============================================================
    // 更新难度 D
    //
    // ΔD = −w₆ × (G − 3)
    // D′ = D + ΔD × (10 − D) / 9           (线性阻尼)
    //
    // Again (G=1) 时多一步均值回归：
    //   D″ = w₇ × D₀(4) + (1 − w₇) × D′
    // ============================================================
    function nextDifficulty(w, d, rating) {
        var deltaD = -w[6] * (rating - 3);
        var newD = d + deltaD * (10 - d) / 9;

        // Again 时的均值回归
        if (rating === 1) {
            var d0Easy = initDifficulty(w, 4);  // Easy 评分的初始难度
            newD = w[7] * d0Easy + (1 - w[7]) * newD;
        }

        return Math.max(1, Math.min(10, newD));
    }

    // ============================================================
    // 遗忘后的稳定性 (Again, G=1)
    // S′ = w₈ × D^(−w₉) × ((S+1)^w₁₀ − 1) × e^(w₁₁ × (1−R))
    // ============================================================
    function nextForgetStability(w, d, s, r) {
        return w[8] *
            Math.pow(d, -w[9]) *
            (Math.pow(s + 1, w[10]) - 1) *
            Math.exp(w[11] * (1 - r));
    }

    // ============================================================
    // 成功回忆后的稳定性 (Hard/Good/Easy, G=2/3/4)
    //
    // Hard (G=2):  S′ = S × (1 + e^w₁₂ × (11−D) × S^(−w₁₃) × (e^(w₁₄×(1−R))−1) × w₁₅)
    // Good (G=3):  S′ = S × (1 + e^w₁₆ × (11−D) × S^(−w₁₇) × (e^(w₁₈×(1−R))−1))
    // Easy (G=4):  S′ = Good_S′ × easyBonus
    // ============================================================
    function nextRecallStability(w, d, s, r, rating) {
        var hardPenalty, easyBonus, sInc;

        if (rating === 2) {
            // Hard: 用 w[12..15] 计算增量，再乘 w[15] 惩罚
            sInc = Math.exp(w[12]) *
                (11 - d) *
                Math.pow(s, -w[13]) *
                (Math.exp(w[14] * (1 - r)) - 1);
            hardPenalty = w[15];
            return s * (1 + sInc * hardPenalty);

        } else if (rating === 3) {
            // Good: 用 w[16..18] 计算增量
            sInc = Math.exp(w[16]) *
                (11 - d) *
                Math.pow(s, -w[17]) *
                (Math.exp(w[18] * (1 - r)) - 1);
            return s * (1 + sInc);

        } else {
            // Easy (rating === 4): Good 的基础上加 easyBonus
            sInc = Math.exp(w[16]) *
                (11 - d) *
                Math.pow(s, -w[17]) *
                (Math.exp(w[18] * (1 - r)) - 1);
            easyBonus = w[15];  // 复用 Hard 惩罚参数作为 Easy 奖励
            return s * (1 + sInc) * (1 + easyBonus);
        }
    }

    // ============================================================
    // 从稳定性计算下次复习间隔（天数）
    // I(r, S) = S × (r^(1/DECAY) − 1) / FACTOR
    // ============================================================
    function nextInterval(stability, requestRetention) {
        var interval = stability *
            (Math.pow(requestRetention, 1 / DECAY) - 1) /
            FACTOR;
        return Math.min(Math.max(1, Math.round(interval)), MAXIMUM_INTERVAL);
    }

    // ============================================================
    // 公开 API
    // ============================================================

    /**
     * 初始化卡片的 FSRS 字段（向后兼容：旧卡片没有这些字段）
     */
    function initCard(card) {
        if (card.state === undefined) card.state = 'New';
        if (card.stability === undefined) card.stability = 0;
        if (card.difficulty === undefined) card.difficulty = 0;
        if (card.lastReview === undefined) card.lastReview = null;
        if (card.due === undefined) card.due = null;
        if (card.reps === undefined) card.reps = 0;
        if (card.lapses === undefined) card.lapses = 0;
        return card;
    }

    /**
     * 计算卡片当前的可提取性 R
     */
    function getRetrievability(card) {
        initCard(card);
        if (card.state === 'New' || card.stability <= 0) return 1;
        var elapsed = card.lastReview
            ? Math.max(0, (Date.now() - new Date(card.lastReview).getTime()) / (1000 * 60 * 60 * 24))
            : 0;
        return retrievability(elapsed, card.stability);
    }

    /**
     * 判断卡片是否到期需要复习
     */
    function isDue(card) {
        initCard(card);
        if (card.state === 'New' || !card.due) return true;
        return Date.now() >= new Date(card.due).getTime();
    }

    /**
     * 核心调度函数：根据评分安排下一次复习
     *
     * @param {Object} card   - 单词卡片对象（会被原地修改）
     * @param {number} rating - 评分: 1=Again, 2=Hard, 3=Good
     * @param {Date}   now    - 当前时间
     * @returns {Object} 更新后的卡片
     */
    function schedule(card, rating, now) {
        initCard(card);
        var w = DEFAULT_W;
        var nowDate = new Date(now);

        // 计算距上次复习的天数
        var elapsedDays = card.lastReview
            ? Math.max(0, (nowDate.getTime() - new Date(card.lastReview).getTime()) / (1000 * 60 * 60 * 24))
            : 0;

        // 当前可提取性
        var r = (card.state === 'New')
            ? 1
            : retrievability(elapsedDays, card.stability);

        // 更新难度和稳定性
        if (card.state === 'New') {
            card.difficulty = initDifficulty(w, rating);
            card.stability = initStability(w, rating);
        } else {
            card.difficulty = nextDifficulty(w, card.difficulty, rating);

            if (rating === 1) {
                card.stability = nextForgetStability(w, card.difficulty, card.stability, r);
                card.lapses++;
            } else {
                card.stability = nextRecallStability(w, card.difficulty, card.stability, r, rating);
            }
        }

        // 更新元数据
        card.lastReview = nowDate.toISOString();
        card.reps++;
        card.state = 'Review';

        // 计算下次到期时间
        if (rating === 1) {
            // 忘记：10 分钟后再次到期（用于同次会话中的重新复习）
            card.due = new Date(nowDate.getTime() + 10 * 60 * 1000).toISOString();
        } else {
            var interval = nextInterval(card.stability, REQUEST_RETENTION);
            var dueDate = new Date(nowDate);
            dueDate.setDate(dueDate.getDate() + interval);
            card.due = dueDate.toISOString();
        }

        return card;
    }

    /**
     * 获取下次复习间隔的描述文字
     */
    function getIntervalDescription(card) {
        initCard(card);
        if (!card.due) return '新卡片';
        var intervalMs = new Date(card.due).getTime() - Date.now();
        if (intervalMs <= 0) return '现在';
        var minutes = Math.round(intervalMs / (1000 * 60));
        if (minutes < 60) return minutes + ' 分钟后';
        var hours = Math.round(intervalMs / (1000 * 60 * 60));
        if (hours < 24) return hours + ' 小时后';
        var days = Math.round(intervalMs / (1000 * 60 * 60 * 24));
        if (days < 30) return days + ' 天后';
        var months = Math.round(days / 30);
        if (months < 12) return months + ' 个月后';
        return Math.round(days / 365) + ' 年后';
    }

    // ============================================================
    // 导出
    // ============================================================
    return {
        initCard: initCard,
        getRetrievability: getRetrievability,
        isDue: isDue,
        schedule: schedule,
        getIntervalDescription: getIntervalDescription
    };
})();
