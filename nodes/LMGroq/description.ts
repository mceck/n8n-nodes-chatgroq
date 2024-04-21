import type { INodeProperties, INodeTypeDescription } from 'n8n-workflow';

export const groqDescription: Partial<INodeTypeDescription> = {
	credentials: [
		{
			name: 'groqApi',
			required: true,
		},
	],
	requestDefaults: {
		baseURL: 'https://api.groq.com',
		headers: {
			Authorization: '={{"Bearer "+$credentials.token}}',
		},
	},
};

export const groqModel: INodeProperties = {
	displayName: 'Model',
	name: 'model',
	type: 'options',
	default: 'llama3-70b-8192',
	description: 'The model which will generate the completion.',
	typeOptions: {
		loadOptions: {
			routing: {
				request: {
					method: 'GET',
					url: '/openai/v1/models',
				},
				output: {
					postReceive: [
						{
							type: 'rootProperty',
							properties: {
								property: 'data',
							},
						},
						{
							type: 'setKeyValue',
							properties: {
								name: '={{$responseItem.id}}',
								value: '={{$responseItem.id}}',
							},
						},
						{
							type: 'sort',
							properties: {
								key: 'name',
							},
						},
					],
				},
			},
		},
	},
	required: true,
};

export const groqOptions: INodeProperties = {
	displayName: 'Options',
	name: 'options',
	placeholder: 'Add Option',
	description: 'Additional options to add',
	type: 'collection',
	default: {},
	options: [
		{
			displayName: 'Sampling Temperature',
			name: 'temperature',
			default: 0.7,
			typeOptions: { maxValue: 1, minValue: 0, numberPrecision: 1 },
			description:
				'Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive.',
			type: 'number',
		},
		{
			displayName: 'Max tokens',
			name: 'maxTokens',
			default: 800,
			typeOptions: { maxValue: 13000, minValue: -1, numberPrecision: 1 },
			description: 'The maximum number of tokens to generate.',
			type: 'number',
		},
	],
};
