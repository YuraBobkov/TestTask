'use strict';

const { getCollection } = require('../../mongo');

const drop = async (ctx) => {
  const collection = await getCollection('jobs');

  await collection.deleteOne({ _id: ctx.params.id });

  ctx.status = 204;
};

module.exports = drop;
