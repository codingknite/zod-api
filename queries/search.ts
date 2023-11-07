export const permawebQuery = (text: string) => {
  return `
  query {
    transactions(
      first:100,
      tags:[
        {
          values:["${text}"]
        },
        {
          name:"Type",
          values:["page"]
        },
        {
          name:"Title",
          values:[""]
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

export const documentQuery = (text: string) => {
  return `
  query {
    transactions(
      first:100,
      tags:[
        {
          values:["${text}"]
        },
        {
          name:"Type",
          values:["document"]
        },
        {
          name:"Title",
          values:[""]
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

export const searchPageWithTxnId = (id: string) => {
  return `
  query {
    transactions(
      ids:["${id}"],
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

export const searchDocWithTxnId = (id: string) => {
  return `
  query {
    transactions(
      ids:["${id}"],
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
