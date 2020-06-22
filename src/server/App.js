import { ApolloServer } from 'apollo-server'
import { genSchema } from '../utils/genSchema'
import { createComplexityLimitRule } from 'graphql-validation-complexity';

const schema = genSchema()

const server = new ApolloServer({
  schema,
  //validationRules: [createComplexityLimitRule(10)],
})

server.listen(4000).then(({port}) => { console.log(`Runing ON ${port}`) })