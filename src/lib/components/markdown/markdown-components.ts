import Callout from './callout.svelte';
import CodeBlock from '../code-block/code-block.svelte';
import type { ComponentType } from 'svelte';

export const components: { [componentName: string]: ComponentType } = { Callout, CodeBlock };

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
