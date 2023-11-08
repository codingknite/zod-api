type ContentType = 'images' | 'videos' | 'pages' | 'documents';

export const searchArweaveQuery = (text: string, type: ContentType) => {
  return `
  query {
    transactions(
      first:100,
      tags:[
        {
          values:["${text}"]
        },
        {
          name:"Content-Type",
          values:[${
            type === 'images'
              ? `"image/png", "image/jpeg"`
              : type === 'videos'
              ? `"video/mp4"`
              : type === 'documents'
              ? `"application/pdf"`
              : `"text/html"`
          }]
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
