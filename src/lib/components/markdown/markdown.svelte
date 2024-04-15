<script lang="ts">
	import hljs from 'highlight.js';
	import markdownit from 'markdown-it';
	const md = markdownit({
		html: true,
		breaks: true,
		linkify: true,
		typographer: true,
		highlight: function (str, lang) {
			let code = '';
			if (lang && hljs.getLanguage(lang)) {
				try {
					code = hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
				} catch (__) {}
			}
			if (!code) {
				code = md.utils.escapeHtml(str);
			}
			return (
				'<div>' +
				`<div class="rounded-t-lg flex justify-between items-center p-2 pl-4 bg-accent-200 text-white">${
					lang || 'Code'
				}</div>` +
				'<div class="text-black bg-slate-100"><code class="hljs text-black !bg-slate-100">' +
				code +
				'</code></div>' +
				'</div>'
			);
		}
	});

	export let markdown: string | undefined;

	$: html = markdown ? md.render(markdown.trim()) : '';
</script>

<div class="markdown">
	{@html html}
</div>
