import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateRecipeArgs {
  name: string;
  ingredients: { ingredientId: number; quantity: number }[];
}

const resolvers = {
  Query: {
    recipes: async () => {
      return await prisma.recipe.findMany({
        include: {
          ingredients: {
            include: {
              ingredient: true,
            },
          },
        },
      });
    },
  },
  Mutation: {
    createRecipe: async (_: unknown, { name, ingredients }: CreateRecipeArgs) => {
      return await prisma.recipe.create({
        data: {
          name,
          ingredients: {
            create: ingredients.map(({ ingredientId, quantity }) => ({
              ingredient: { connect: { id: ingredientId } },
              quantity,
            })),
          },
        },
        include: {
          ingredients: {
            include: {
              ingredient: true,
            },
          },
        },
      });
    },
  },
};

export default resolvers;
