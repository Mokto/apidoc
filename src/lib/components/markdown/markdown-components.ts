import Callout from './callout.svelte';
import type { ComponentType } from 'svelte';
import CodeBlockMarkdocSvelte from './code-block-markdoc.svelte';

export const components: { [componentName: string]: ComponentType } = {
	Callout,
	CodeBlock: CodeBlockMarkdocSvelte
};

export const markdownConfig = {
	tags: {
		callout: {
			render: 'Callout',
			attributes: {
				type: {
					type: String,
					default: 'note',
					matches: ['caution', 'check', 'note', 'warning']
				},
				title: {
					type: String
				}
			}
		}
	},
	nodes: {
		fence: {
			render: 'CodeBlock',
			attributes: {
				content: {
					type: String
				},
				language: {
					type: String
				}
			}
		}
	}
};
