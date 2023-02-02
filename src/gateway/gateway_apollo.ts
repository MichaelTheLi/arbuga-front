import { useQuery } from "@vue/apollo-composable";
import { gql } from "@/__generated__";

const LOAD_ECOSYSTEMS = gql(/* GraphQL */ `
  query ecosystemsQuery {
    ecosystems @client {
      id
      name
      aquarium {
        dimensions {
          width
          height
          length
        }
      }
      analysis {
        id
        name
        description
        status
        messages {
          id
          name
          description
          status
        }
      }
    }
  }
`);

export const loadEcosystems = () => {
  return useQuery(LOAD_ECOSYSTEMS);
};
