import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export const getSortedPostsData = () => {
	// /posts配下のファイル名を取得する
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map((fileName) => {
		// id を取得するためにファイル名から ".md" を削除する
		const id = fileName.replace(/\.md$/, '');

		// マークダウンファイルを文字列として読み取る
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');

		// 投稿のメタデータ部分を解析するために gray-matter を使う
		const matterResult = matter(fileContents);

		// データを id と合わせる
		return {
			id,
			...matterResult.data,
		};
	});
	// 投稿を日付でソートする
	return allPostsData.sort((a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	});
};

export const getAllPostIds = () => {
	const fileNames = fs.readdirSync(postsDirectory);

	/**
	 * @example
	 * ```js
	 *  [
	 *    {
	 *      params: { id: 'ssg-ssr' }
	 *    },
	 *    {
	 *      params: { id: 'pre-rendering' }
	 *    }
	 *  ]
	 * ```
	 */
	return fileNames.map((fileName) => {
		return {
			params: {
				id: fileName.replace(/\.md$/, ''),
			},
		};
	});
};

export const getPostData = async (id) => {
	const fullPath = path.join(postsDirectory, `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');

	// 投稿のメタデータ部分を解析するために gray-matter を使う
	const matterResult = matter(fileContents);

	return {
		id,
		fileContents,
		...matterResult.data,
	};
};
