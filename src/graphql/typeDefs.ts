import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Ingredient {
    id: ID!
    name: String!
    supplier: String!
    latestPrice: Float!
  }

  type PriceChange {
    changedAt: String!
    price: Float!
  }

  type Recipe {
    id: ID!
    name: String!
    ingredients: [RecipeIngredient!]!
    totalCost: Float!
  }

  type RecipeIngredient {
    ingredient: Ingredient!
    quantity: Float!
  }

  type Query {
    ingredients: [Ingredient!]!
    recipes: [Recipe!]!
  }

  type Mutation {
    createRecipe(name: String!, ingredients: [RecipeIngredientInput!]!): Recipe!
  }

  input RecipeIngredientInput {
    ingredientId: ID!
    quantity: Float!
  }
`;
