/* eslint-disable n8n-nodes-base/node-dirname-against-convention */
import {
	NodeConnectionType,
	type IExecuteFunctions,
	type INodeType,
	type INodeTypeDescription,
	type SupplyData,
} from 'n8n-workflow';

import { ChatGroq } from '../../utils/fix-json';
import { logWrapper } from '../../utils/log';
import { getConnectionHintNoticeField } from '../../utils/fields';
import { groqModel, groqOptions, groqDescription } from '../LMGroq/description';

export class LmChatGroq implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Groq Chat Model',
		// eslint-disable-next-line n8n-nodes-base/node-class-description-name-miscased
		name: 'lmChatGroq',
		icon: 'file:groq.png',
		group: ['transform'],
		version: 1,
		description: 'Language Model Groq',
		defaults: {
			name: 'Groq Chat Model',
		},
		codex: {
			categories: ['AI'],
			subcategories: {
				AI: ['Language Models'],
			},
			resources: {
				primaryDocumentation: [
					{
						url: 'https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatollama/',
					},
				],
			},
		},
		// eslint-disable-next-line n8n-nodes-base/node-class-description-inputs-wrong-regular-node
		inputs: [],
		// eslint-disable-next-line n8n-nodes-base/node-class-description-outputs-wrong
		outputs: [NodeConnectionType.AiLanguageModel],
		outputNames: ['Model'],
		...groqDescription,
		properties: [
			getConnectionHintNoticeField([NodeConnectionType.AiChain, NodeConnectionType.AiAgent]),
			groqModel,
			groqOptions,
		],
	};

	async supplyData(this: IExecuteFunctions, itemIndex: number): Promise<SupplyData> {
		const credentials = await this.getCredentials('groqApi');

		const modelName = this.getNodeParameter('model', itemIndex) as string;
		const options = this.getNodeParameter('options', itemIndex, {}) as object;

		const model = new ChatGroq({
			apiKey: credentials.token as string,
			modelName: modelName,
			...options,
		});

		return {
			response: logWrapper(model, this),
		};
	}
}
