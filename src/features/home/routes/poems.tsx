import { Scafold, Text } from "@/src/components/";
import { Poem } from "@/src/components/poem";
import React from "react";
import { ScrollView, View } from "react-native";
import { Divider } from "react-native-paper";

export const HomePoems = () => {
  console.log("poems-->");
  const POEMS = [
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
  ];
  return (
    <Scafold
      style={{
        flex: 1, // This will ensure the container takes up the entire screen height
      }}
    >
      <View className="flex flex-col gap-4">
        {POEMS.map((poem) => (
          <React.Fragment key={poem.slug}>
            <Poem poem={poem} />
            <Divider className="my-8" />
          </React.Fragment>
        ))}
      </View>
    </Scafold>
  );
};
