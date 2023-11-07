/***
 *
 * type
 */

type MediaType = 'image' | 'video';

export const noInput = (type: MediaType) => {
  return `
  query {
  transactions(
    first: 100,
    tags: [
      {
        name:"Type",
        values: ["${type}"]
      },
      {
        name:"Title",
        values:[""]
      },
      {
        name:"License",
        values:["yRj4a5KMctX_uOmKWCFJIjmY8DeJcusVk6-HzLiM_t8"]
      },
    ]
    ) 
    {
      edges {
        node {
          id
          tags {
            name
            value
          }
          data {
            size
            type
          }
        }
      }
    }
  }
`;
};

// accepts type and id
export const transactionWithId = (id: string, type: MediaType) => {
  return `
  query {
    transactions(
      ids:["${id}"],
      tags: [
        {
          name:"Content-Type"
          values:${
            type === 'image' ? `["image/png", "image/jpeg"]` : `["video/mp4"]`
          }
        }
      ]
    ) 
    {
      edges {
        node {
          id
          tags {
            name
            value
          }
          data {
            size
            type
          }
        }
      }
    }
  }
`;
};

// only return images with atleast a title
export const withSearchString = (text: string, type: MediaType) => {
  return `
query just_string {
  transactions(
    first: 100,
    tags: [
      {
        values:["${text}"]
      },
      {
        name:"Type",
        values:["${type}"]
      },
      {
        name:"Title",
        values:[""]
      }
    ]
  ) 
  {
    edges {
      node {
        id
        tags {
          name
          value
        }
      }
    }
  }
}
`;
};
