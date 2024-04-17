import type { INodeProperties, INodeTypeDescription } from 'n8n-workflow';

export const groqDescription: Partial<INodeTypeDescription> = {
	credentials: [
		{
			name: 'groqApi',
			required: true,
		},
	],
	requestDefaults: {
		ignoreHttpStatusErrors: true,
		baseURL: 'https://example.com',
	},
};

export const groqModel: INodeProperties = {
	displayName: 'Model',
	name: 'model',
	type: 'options',
	default: 'mixtral-8x7b-32768',
	description: 'The model which will generate the completion.',
	options: [
		{
			name: 'mixtral',
			value: 'mixtral-8x7b-32768',
		},
		{
			name: 'llama2',
			value: 'llama2-70b-4096',
		},
		{
			name: 'gemma',
			value: 'gemma-7b-it',
		},
	],
	routing: {
		send: {
			type: 'body',
			property: 'model',
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
