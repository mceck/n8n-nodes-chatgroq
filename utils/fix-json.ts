import { ChatGroq as _ChatGroq } from '@langchain/groq';

export class ChatGroq extends _ChatGroq {
	async stream(input: any, options?: any) {
		console.error('stream');
		const ret = await super.stream(input, options);
		for await (const chunk of ret) {
			console.error('oldchunk', chunk.content);
			chunk.content = chunk.content.toString().replace('\\_', '_');
			console.error('chunk', chunk.content);
		}
		console.error(ret);
		return ret;
	}

	async invoke(input: any, options?: any | undefined): Promise<any> {
		const ret = await super.invoke(input, options);
		ret.content = ret.content.toString().replace('\\_', '_');
		console.error(ret);
		return ret;
	}
}
