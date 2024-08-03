export interface Recipe {
  recipeTitle: {
    english: string;
    french: string;
    spanish: string;
    marathi: string;
    hindi: string;
  };
  recipeImageUrl: {
    english: string;
    french: string;
    spanish: string;
    marathi: string;
    hindi: string;
  };
  recipeMethod: {
    english: string;
    french: string;
    spanish: string;
    marathi: string;
    hindi: string;
  };
  recipeIngridents: {
    english: string;
    french: string;
    spanish: string;
    marathi: string;
    hindi: string;
  };
  recipeCookingTime: {
    english: string;
    french: string;
    spanish: string;
    marathi: string;
    hindi: string;
  };
  comment: {
    email: string;
    username: string;
    comment: {
      english: string;
      french: string;
      spanish: string;
      marathi: string;
      hindi: string;
    };
  }[];
  recipeDesc: {
    english: string;
    french: string;
    spanish: string;
    marathi: string;
    hindi: string;
  };
  likeCount: number;
  id: string;
  tags: string[];
}

// {
//     "M": {
//       "comment": {
//         "M": {
//           "english": {
//             "S": "The bestest recipe ever tested"
//           },
//           "french": {
//             "S": "La meilleure recette jamais testée"
//           },
//           "hindi": {
//             "S": "अब तक की सबसे अच्छी रेसिपी जिसे आजमाया गया है"
//           },
//           "marathi": {
//             "S": "आता चाचणी केलेली सर्वोत्तम"
//           },
//           "spanish": {
//             "S": "La mejor receta jamás probada"
//           }
//         }
//       },
//       "email": {
//         "S": "jadhavshraddha7588@gmail.com"
//       },
//       "username": {
//         "S": "Shraddha Jadhav"
//       }
//     }
//   }
