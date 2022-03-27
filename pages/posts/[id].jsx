import Head from 'next/head';
import Layout from '../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import ReactMarkdown from 'react-markdown';

const Post = ({ postData }) => {
	return (
		<Layout>
			<Head>
				<title>{postData.title}</title>
			</Head>
			{postData.title}
			<br />
			{postData.id}
			<br />
			{postData.date}
			<br />
			<ReactMarkdown children={postData.fileContents} />
		</Layout>
	);
};

export const getStaticPaths = async () => {
	const paths = getAllPostIds();
	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async ({ params }) => {
	const postData = await getPostData(params.id);
	return {
		props: {
			postData,
		},
	};
};

export default Post;
