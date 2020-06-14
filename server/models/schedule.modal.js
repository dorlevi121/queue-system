module.exports = (mongo) => {
    return mongo
        .useDb(mongo.name)
        .model("Schedule", SingletonScheduleSchema.getScheduleSchema(mongo));
};

const SingletonScheduleSchema = (() => {
    let scheduleSchema;

    const createScheduleSchema = (mongo) => {
        const Schema = mongo.base.Schema;
        return new Schema(
            {
                weekNumber: {
                    type: Number,
                    required: true,
                },

                year: {
                    type: String,
                    required: true,
                },

                events: {
                    type: Array,
                    of: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
                    required: true
                },
            },
            { timestamps: true }
        );
    };

    return {
        getScheduleSchema: (mongo) => {
            if (!scheduleSchema) scheduleSchema = createScheduleSchema(mongo);
            return scheduleSchema;
        },
    };
})();
