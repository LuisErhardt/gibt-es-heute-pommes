import dotenv from "dotenv";
dotenv.config({ quiet: true });

const BLUESKY_HANDLE = process.env.BLUESKY_HANDLE;
const BLUESKY_APP_PASSWORD = process.env.BLUESKY_APP_PASSWORD;

async function createSession() {
  const body = JSON.stringify({
    identifier: BLUESKY_HANDLE,
    password: BLUESKY_APP_PASSWORD,
  });
  const resp = await fetch("https://bsky.social/xrpc/com.atproto.server.createSession", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (!resp.ok) {
    throw new Error(`HTTP error! Status: ${resp.status}`);
  }

  const session = await resp.json();
  console.log("Session created");
  return session;
}

export async function createPost(text: string = "") {
  const session = await createSession();
  const now = new Date().toISOString();
  const post = {
    $type: "app.bsky.feed.post",
    text: text,
    createdAt: now,
  };

  const resp = await fetch("https://bsky.social/xrpc/com.atproto.repo.createRecord", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessJwt}`,
    },
    body: JSON.stringify({
      repo: session.did,
      collection: "app.bsky.feed.post",
      record: post,
    }),
  });

  if (!resp.ok) {
    throw new Error(`HTTP error! Status: ${resp.status}`);
  }

  await resp.json();
  console.log("Post sucessful!");
}
