module.exports = (mongo) => {
  return mongo
    .useDb(mongo.name)
    .model("Client", SingletonClientSchema.getClientSchema(mongo));
};

const SingletonClientSchema = (() => {
  let clientSchema;

  const createClientSchema = (mongo) => {
    const Schema = mongo.base.Schema;
    return new Schema(
      {
        name: {
          type: String,
          required: true,
          maxlength: 32,
        },
        lastName: {
          type: String,
          required: true,
          maxlength: 32,
        },
        phone: {
          type: String,
          unique: true,
          required: true
        },
        image: {
          type: String,
          default: "",
        },
        events: {
          type: Array,
          of: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
          required: true,
          default: []
        },
        reliability: {
          type: Number,
          default: 5,
        },
      },
      { timestamps: true }
    );
  };

  return {
    getClientSchema: (mongo) => {
      if (!clientSchema) clientSchema = createClientSchema(mongo);
      return clientSchema;
    },
  };
})();
