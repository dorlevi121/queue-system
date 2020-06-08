module.exports = (mongo) => {
  return mongo
    .useDb(mongo.name)
    .model("Employee", SingletonEmployeeSchema.getEmployeeSchema(mongo));
};

const SingletonEmployeeSchema = (() => {
  let employeeSchema;

  const createEmployeeSchema = (mongo) => {
    const Schema = mongo.base.Schema;
    return new Schema({
      firstName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
      },
      lastName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
      },
      phone: {
        type: String,
        trim: true,
        required: true,
        maxlength: 11,
      },
      email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      isAdmin: {
        type: Boolean,
        required: true,
        default: true,
      },
      schedule: {
        type: [
          {
            day: {
              type: String,
              required: true,
            },
            startTime: {
              type: Date,
              required: true,
            },
            endTime: {
              type: Date,
              required: true,
            },
          },
        ],
        required: true,
      },
    });
  };

  return {
    getEmployeeSchema: (mongo) => {
      if (!employeeSchema) employeeSchema = createEmployeeSchema(mongo);

      return employeeSchema;
    },
  };
})();
