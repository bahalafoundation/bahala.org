import { defineConfig, Collection, TinaField } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const collections: Collection[] = [];

// Commonly used fields

const titleField: TinaField = {
  type: "string",
  name: "title",
  label: "Title",
  isTitle: true,
  required: true,
};
const bodyField: TinaField = {
  type: "rich-text",
  name: "body",
  label: "Body",
  isBody: true,
};

// Collections

collections.push({
  name: "person",
  label: "People",
  path: "content/people",
  fields: [
    {
      type: "string",
      name: "firstName",
      label: "First Name",
      required: true,
    },
    {
      type: "string",
      name: "lastName",
      label: "Last Name",
      required: false,
    },
    {
      type: "string",
      name: "email",
      label: "Email",
      required: false,
    },
    {
      type: "string",
      name: "url",
      label: "URL",
      required: false,
    },
    {
      type: "rich-text",
      name: "bio",
      label: "Bio",
      required: false,
      isBody: true,
    },
  ]
});

collections.push({
  name: "space",
  label: "Spaces",
  path: "content/spaces",
  fields: [
    {
      type: "string",
      name: "name",
      label: "Name",
      required: true,
    },
    {
      type: "string",
      name: "address",
      label: "Address",
      required: false,
    },
    {
      type: "rich-text",
      name: "desc",
      label: "Description",
      required: false,
      isBody: true,
    },
  ]
});

collections.push({
  name: "post",
  label: "Posts",
  path: "content/posts",
  fields: [
    titleField,
    bodyField,
    {
      type: "reference",
      name: "author",
      label: "Author",
      collections: ["person"],
    },
    {
      type: "datetime",
      name: "publishDate",
      label: "Publish date",
    },
  ],
});

collections.push({
  name: "event",
  label: "Events",
  path: "content/events",
  fields: [
    titleField,
    bodyField,
    {
      type: "datetime",
      name: "when",
      label: "When",
    },
    {
      type: "reference",
      name: "venue",
      label: "Venue",
      collections: ["space"],
    },
  ],
});

// Single page collections
const singlePageOptions = {
  allowedActions: {
    create: false,
    delete: false,
    createNestedFolder: false,
  },
};

collections.push({
  name: "programs",
  label: "Programs",
  path: "content/programs",
  ui: singlePageOptions,
  fields: [titleField, bodyField],
});

collections.push({
  name: "mission",
  label: "Mission",
  path: "content/mission",
  ui: singlePageOptions,
  fields: [titleField, bodyField],
});

collections.push({
  name: "community",
  label: "Community",
  path: "content/community",
  ui: singlePageOptions,
  fields: [titleField, bodyField],
});

collections.push({
  name: "give",
  label: "Give",
  path: "content/give",
  ui: singlePageOptions,
  fields: [titleField, bodyField],
});

collections.push({
  name: "contact",
  label: "Contact",
  path: "content/contact",
  ui: singlePageOptions,
  fields: [titleField, bodyField],
});

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "static",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: collections,
  },
});
