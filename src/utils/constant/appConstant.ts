import { IAppPlayList, Obj, POEMREACTION } from "@/src/types";
import dayjs from "dayjs";
export const SOMETHING_WENT_WRONG = "Something went wrong!";
export const TOKEN_ERROR = "Error acquiring token";
export const SESSION_EXPIRED = "Your session has expired!";
export const POETREE_USER = "POETREE_USER";
export const REQUIRED_VALIDATION_MESSAGE = "This field is required";
export const POEMS: any[] = [
  {
    _id: "1222",
    title: "Poem Title",
    body: `
<div class="poem-body" style="font-size: 18px; line-height: 1.6;">
<p>Two roads diverged in a yellow wood,</p>
<p>And sorry I could not travel both</p>
<p>And be one traveler, long I stood</p>
<p>And looked down one as far as I could</p>
<p>To where it bent in the undergrowth;</p>

<p>Then took the other, as just as fair,</p>
<p>And having perhaps the better claim,</p>
<p>Because it was grassy and wanted wear;</p>
<p>Though as for that the passing there</p>
<p>Had worn them really about the same,</p>

<p>And both that morning equally lay</p>
<p>In leaves no step had trodden black.</p>
<p>Oh, I kept the first for another day!</p>
<p>Yet knowing how way leads on to way,</p>
<p>I doubted if I should ever come back.</p>

<p>I shall be telling this with a sigh</p>
<p>Somewhere ages and ages hence:</p>
<p>Two roads diverged in a wood, and I—</p>
<p>I took the one less traveled by,</p>
<p>And that has made all the difference.</p>
</div>`,
    createdAt: "2021-10-10",
    updatedAt: "2021-10-11",
    __v: 0,
    slug: "poem-title",
    isFollowedByCurrentUser: false,
    likeCount: 10,
    commentCount: 20,
    hasUserLiked: false,
    hashTags: [
      { _id: "1", name: "ReactNative" },
      { _id: "2", name: "JavaScript" },
      { _id: "3", name: "UIUX" },
    ],
    comments: [],
    likes: [],
    video:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    postedBy: {
      _id: "1",
      name: "John Doe",
      email: "",
      createdAt: "",
      expiryDate: "",
      isActive: false,
      platformAccess: "",
      role: "",
      updatedAt: "",
      followings: [],
      followers: [],
      followersCount: 0,
      followingCount: 0,
      slug: "",
    },
  },
  {
    _id: "1222",
    title: "Poem Title 123213",
    body: `
<div class="poem-body" style="font-size: 18px; line-height: 1.6;">
<p>Two roads diverged in a yellow wood,</p>
<p>And sorry I could not travel both</p>
<p>And be one traveler, long I stood</p>
<p>And looked down one as far as I could</p>
<p>To where it bent in the undergrowth;</p>

<p>Then took the other, as just as fair,</p>
<p>And having perhaps the better claim,</p>
<p>Because it was grassy and wanted wear;</p>
<p>Though as for that the passing there</p>
<p>Had worn them really about the same,</p>

<p>And both that morning equally lay</p>
<p>In leaves no step had trodden black.</p>
<p>Oh, I kept the first for another day!</p>
<p>Yet knowing how way leads on to way,</p>
<p>I doubted if I should ever come back.</p>

<p>I shall be telling this with a sigh</p>
<p>Somewhere ages and ages hence:</p>
<p>Two roads diverged in a wood, and I—</p>
<p>I took the one less traveled by,</p>
<p>And that has made all the difference.</p>
</div>`,
    createdAt: "2021-10-10",
    updatedAt: "2021-10-11",
    __v: 0,
    slug: "poem-title",
    isFollowedByCurrentUser: false,
    likeCount: 10,
    commentCount: 20,
    hasUserLiked: false,
    hashTags: [
      { _id: "1", name: "ReactNative" },
      { _id: "2", name: "JavaScript" },
      { _id: "3", name: "UIUX" },
    ],
    comments: [],
    likes: [],
    video:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    postedBy: {
      _id: "1",
      name: "John Doe",
      email: "",
      createdAt: "",
      expiryDate: "",
      isActive: false,
      platformAccess: "",
      role: "",
      updatedAt: "",
      followings: [],
      followers: [],
      followersCount: 0,
      followingCount: 0,
      slug: "",
    },
  },
];

export const REACTION_IMAGE: Obj = {
  like: "data:image/png;base64,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",
  love: "data:image/png;base64,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",
  haha: "data:image/png;base64,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",
  wow: "data:image/png;base64,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",
  sad: "data:image/png;base64,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",
  angry:
    "data:image/png;base64,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",
};

export const APPPLAYLIST: IAppPlayList[] = [
  {
    title: "Nature's Symphony",
    price: 10,
    hashTags: [{ name: "#nature", _id: "tag1" }],
    likeCount: 125,
    commentCount: 34,
    slug: "natures-symphony",
    _id: "playlist1",
    poems: [],
    createdBy: {
      _id: "user1",
      name: "Alice Poet",
      email: "alice@example.com",
      createdAt: "2023-01-01",
      updatedAt: "2023-01-02",
      expiryDate: "2025-01-01",
      isActive: true,
      platformAccess: "web",
      role: "creator",
      followings: [],
      followers: [],
      followersCount: 20,
      followingCount: 5,
      slug: "alice-poet",
      photo: "https://example.com/photo1.jpg",
    },
    thumbnail: "https://example.com/playlist1.jpg",
    createdAt: dayjs().toString(),
    isFollowedByCurrentUser: true,
    isLocked: false,
  },
  {
    title: "Urban Echoes",
    price: 15,
    hashTags: [{ name: "#citylife", _id: "tag2" }],
    likeCount: 200,
    commentCount: 50,
    slug: "urban-echoes",
    _id: "playlist2",
    poems: [],
    createdBy: {
      _id: "user2",
      name: "Bob Verses",
      email: "bob@example.com",
      createdAt: "2023-02-15",
      updatedAt: "2023-03-10",
      expiryDate: "2025-02-15",
      isActive: true,
      platformAccess: "mobile",
      role: "creator",
      followings: [],
      followers: [],
      followersCount: 45,
      followingCount: 12,
      slug: "bob-verses",
      photo: "https://example.com/photo2.jpg",
    },
    thumbnail: "https://example.com/playlist2.jpg",
    userLike: {
      type: POEMREACTION.LOVE,
      _id: "like123",
    },
    createdAt: dayjs().toString(),
    isFollowedByCurrentUser: true,
    isLocked: false,
  },
];
