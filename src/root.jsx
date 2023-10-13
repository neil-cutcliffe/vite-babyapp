import React, { useEffect } from "react";
import {
  Outlet,
  NavLink,
  Link,
  useLoaderData,
  useLocation,
  useNavigation,
  useSubmit,
  redirect,
  Form,
} from "react-router-dom";
import { getPosts, getMedia } from "ba-api";
import SampleCard from './components/SampleCard/SampleCard';


export async function loader({ request }) {
  console.log('rootLoader()');
  var posts = null;
  var post = null;

  await getPosts()
  .then( function( data ) {
    posts = data;
    post = {
      title   : posts[0].title.rendered,
      content : posts[0].content.rendered,
    };
  })
  .catch(function( err ) {
    console.log('root loader .catch')
    console.log(err)
    post = {
      title   : 'Lorem Ipsum',
      content : 'Lorem ipsum test to be seen and not read for placement only. Lorem ipsum test to be seen.',
      image   : 'url(/src/assets/images/SampleCard_Image.png)'
    };
  })

  if ( posts ) {
    let media = await getMedia(posts[0].featured_media);
    post['image'] = 'url(' + media.media_details.sizes.medium.source_url +')'
  }

  return { post };
}

export default function Root() {
  console.log('Root()');
  const { post } = useLoaderData();
//  const navigation = useNavigation();

  return (
    <SampleCard post={post} />
  );
}
