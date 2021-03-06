/* eslint-disable new-cap */
'use strict';

const { range, pipe, map } = require('remeda');
const faker = require('faker');

const { getCollection } = require('../../mongo');
const {
  normalizeRecord,
  createProcessStatus,
} = require('../../utils/documents');
const { ObjectID } = require('mongodb');

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const jobStatuses = ['running', 'succeed', 'failed'];

const create = async (ctx) => {
  const processesCollection = await getCollection('processes');
  const jobsCollection = await getCollection('jobs');

  const jobsCount = getRandomIntInclusive(1, 10);

  const process = {
    _id: ObjectID(),
    name: faker.commerce.productName(),
    startTime: Date.parse(faker.date.past()),
    jobsCount,
  };

  const jobs = pipe(
    range(1, jobsCount + 1),
    map(() => ({
      processId: process._id,
      name: faker.company.companyName(),
      status: faker.helpers.randomize(jobStatuses),
    })),
  );

  const processesResponse = await processesCollection.insertOne(process);
  await jobsCollection.insertMany(jobs);

  const processWithStatus = await createProcessStatus(processesResponse.ops[0]);

  const normalizedProcess = normalizeRecord(processWithStatus);

  ctx.status = 201;
  ctx.body = normalizedProcess;
};

module.exports = create;
