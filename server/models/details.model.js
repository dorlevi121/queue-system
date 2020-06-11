module.exports = (mongo) => {
  return mongo
    .useDb(mongo.name)
    .model("Business", SingletonBusinessSchema.getBusinessSchema(mongo));
};

const SingletonBusinessSchema = (() => {
  let businessSchema;

  const createBusinessSchema = (mongo) => {
    const Schema = mongo.base.Schema;
    return new Schema(
      {
        name: {
          type: String,
          trim: true,
          required: true, // remove whitespace characters
          maxlength: 32,
        },
        address: {
          type: String,
          trim: true,
          required: true,
          maxlength: 64,
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
        },
        logo: {
          type: String,
          required: false,
          default: "",
        },
        links: {
          type: Map,
          require: false,
          default: {},
        },
        about: {
          type: String,
          require: false,
          default: "",
        },
        notifications: {
          type: [String],
          require: false,
          default: [],
        },
        domain: {
          type: String,
          require: true,

        },
        guestPermission: {
          type: Boolean,
          default: true
        },
        schedule: {
          type: Map,
          require: false,
          default: {},
        },
        hours: {
          type: Map,
          require: false,
          default: {},
        },
      },
      { timestamps: true }
    );
  };

  return {
    getBusinessSchema: (mongo) => {
      if (!businessSchema) businessSchema = createBusinessSchema(mongo);
      return businessSchema;
    },
  };
})();
