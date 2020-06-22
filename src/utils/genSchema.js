import * as path from 'path';
import * as fs from 'fs';
import * as glob from 'glob'
import { makeExecutableSchema } from "graphql-tools";
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

export const genSchema = () => {
  const pathSchema = path.join(__dirname, "../GraphQL/resolvers");
  const gqlTypes = glob.sync(`${pathSchema}/**/*.graphql`)
  .map(x => fs.readFileSync(x, {encoding: "utf-8"}))

  const resolvers = glob
    .sync(`${pathSchema}/**/*/resolver.js`)
    .map(resolver => require(resolver).resolvers);
  
  return makeExecutableSchema({
    typeDefs: mergeTypeDefs(gqlTypes),
    resolvers: mergeResolvers(resolvers)
  });
}