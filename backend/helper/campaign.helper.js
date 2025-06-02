import Customer from '../models/customer.model.js';

export const calculateAudienceSize = async (conditions) => {
    
    const filter = buildQueryFromConditions(conditions);

    const audienceSize = await Customer.countDocuments(filter);
    return audienceSize;
};

export const buildQueryFromConditions = (conditions) => {
    const query = {};

    // Total Spend
    if (conditions.totalSpendMin || conditions.totalSpendMax) {
        query.totalSpend = {};
        if (conditions.totalSpendMin) query.totalSpend.$gte = Number(conditions.totalSpendMin);
        if (conditions.totalSpendMax) query.totalSpend.$lte = Number(conditions.totalSpendMax);
    }

    // Average Order Value
    if (conditions.avgOrderValueMin || conditions.avgOrderValueMax) {
        query.avgOrderValue = {};
        if (conditions.avgOrderValueMin) query.avgOrderValue.$gte = Number(conditions.avgOrderValueMin);
        if (conditions.avgOrderValueMax) query.avgOrderValue.$lte = Number(conditions.avgOrderValueMax);
    }

    // Visit Count
    if (conditions.visitCountMin || conditions.visitCountMax) {
        query.visitCount = {};
        if (conditions.visitCountMin) query.visitCount.$gte = Number(conditions.visitCountMin);
        if (conditions.visitCountMax) query.visitCount.$lte = Number(conditions.visitCountMax);
    }

    // Total Orders
    if (conditions.totalOrdersMin || conditions.totalOrdersMax) {
        query.totalOrders = {};
        if (conditions.totalOrdersMin) query.totalOrders.$gte = Number(conditions.totalOrdersMin);
        if (conditions.totalOrdersMax) query.totalOrders.$lte = Number(conditions.totalOrdersMax);
    }

    // Inactive Days (based on lastVisit)
    if (conditions.inactiveDays) {
        const inactiveThreshold = new Date();
        inactiveThreshold.setDate(inactiveThreshold.getDate() - Number(conditions.inactiveDays));
        query.lastVisit = { $lte: inactiveThreshold };
    }

    // Days since joining (createdAt >= x days ago)
    if (conditions.daysSinceJoining) {
        const createdBefore = new Date();
        createdBefore.setDate(createdBefore.getDate() - Number(conditions.daysSinceJoining));
        query.createdAt = { $lte: createdBefore };
    }

    return query;
}