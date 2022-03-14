const graphql = require("graphql");
const Movies = require("../models/movie");
const Directors = require("../models/director");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull,
} = graphql;

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    watched: { type: new GraphQLNonNull(GraphQLBoolean) },
    rate: { type: GraphQLInt },
    director: {
      type: DirectorType,
      resolve({ directorId }, _) {
        return Directors.findById(directorId);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve({ id }, _) {
        return Movies.find({ directorId: id });
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(_, { name, age }) {
        const director = new Directors({ name, age });
        return director.save();
      },
    },
    addMovie: {
      type: MovieType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
      },
      resolve(_, { name, genre, directorId, rate, watched }) {
        const movie = new Movies({
          name,
          genre,
          directorId,
          rate,
          watched,
        });
        return movie.save();
      },
    },
    updateDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(_, { name, age, id }) {
        return Directors.findByIdAndUpdate(
          id,
          { $set: { name, age } },
          { new: true }
        );
      },
    },
    updateMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: GraphQLID },
      },
      resolve(_, name, genre, directorId, rate, watched, id) {
        return Movies.findByIdAndUpdate(
          id,
          {
            $set: {
              name,
              genre,
              directorId,
              rate,
              watched,
            },
          },
          { new: true }
        );
      },
    },
    removeDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(_, { id }) {
        return Directors.findByIdAndRemove(id);
      },
    },
    removeMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(_, { id }) {
        return Movies.findByIdAndRemove(id);
      },
    },
  },
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(_, { id }) {
        return Movies.findById(id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(_, { id }) {
        return Directors.findById(id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve() {
        return Movies.find({});
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve() {
        return Directors.find({});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
