import { CheerioAPI, load as loadCheerio } from 'cheerio';
import { fetchApi } from '@libs/fetch';
import { defaultCover } from '@libs/defaultCover';
import { Plugin } from '@/types/plugin';

class FanFictionNet implements Plugin.PluginBase {
  id = 'fanfictionnet';
  name = 'FanFiction.Net';
  version = '1.0.0';
  site = 'https://www.fanfiction.net';

  parseList($: CheerioAPI): Plugin.NovelItem[] {
    return $('.z-list')
      .map((_, el) => {
        const title = $(el).find('a.stitle').text().trim();
        const href = $(el).find('a.stitle').attr('href');

        if (!href) return null;

        return {
          name: title || 'Untitled',
          path: href.replace(/^\//, ''),
          cover: defaultCover,
        } as Plugin.NovelItem;
      })
      .toArray()
      .filter(Boolean) as Plugin.NovelItem[];
  }

  async popularNovels(
    pageNo: number,
    { showLatestNovels }: Plugin.PopularNovelsOptions,
  ) {
    const sort = showLatestNovels ? 1 : 6;
    const res = await fetchApi(
      `${this.site}/book/?&srt=${sort}&r=10&p=${pageNo}`,
    );
    const text = await res.text();
    const $ = loadCheerio(text);

    return this.parseList($);
  }

  async parseNovel(novelPath: string): Promise<Plugin.SourceNovel> {
    const res = await fetchApi(new URL(novelPath, `${this.site}/`).toString());
    const text = await res.text();
    const $ = loadCheerio(text);

    const novel: Plugin.SourceNovel = {
      path: novelPath,
      name: $('#profile_top > b.xcontrast_txt').text().trim() || 'Untitled',
      cover: defaultCover,
    };

    novel.author = $('#profile_top a[href*="/u/"]').first().text().trim();
    novel.summary = $('#profile_top > div.xcontrast_txt').text().trim();

    const metaParts = $('#profile_top > span.xgray')
      .text()
      .split('-')
      .map(part => part.trim())
      .filter(Boolean);

    if (metaParts.length > 1) {
      const genres = metaParts[1];
      if (genres && !genres.includes('Words:')) {
        novel.genres = genres;
      }
    }

    const statusText = metaParts.find(part =>
      part.toLowerCase().includes('status'),
    );
    if (statusText?.toLowerCase().includes('complete')) {
      novel.status = 'Completed';
    } else if (statusText) {
      novel.status = 'Ongoing';
    }

    const chapters: Plugin.ChapterItem[] = [];
    const chapterOptions = $('#chap_select option');

    if (chapterOptions.length > 0) {
      chapterOptions.each((index, option) => {
        const optionValue = $(option).attr('value')?.trim();
        if (!optionValue) return;

        const name = $(option)
          .text()
          .replace(/^\d+\.\s*/, '')
          .trim();
        chapters.push({
          name: name || `Chapter ${index + 1}`,
          path: optionValue.replace(/^\//, ''),
          chapterNumber: index + 1,
        });
      });
    } else {
      chapters.push({
        name: 'Chapter 1',
        path: novelPath,
        chapterNumber: 1,
      });
    }

    novel.chapters = chapters.reverse();

    return novel;
  }

  async parseChapter(chapterPath: string): Promise<string> {
    const res = await fetchApi(
      new URL(chapterPath, `${this.site}/`).toString(),
    );
    const text = await res.text();
    const $ = loadCheerio(text);

    return $('#storytextp').html() || $('#storytext').html() || '';
  }

  async searchNovels(
    searchTerm: string,
    pageNo: number,
  ): Promise<Plugin.NovelItem[]> {
    const searchUrl =
      `${this.site}/search/?` +
      `keywords=${encodeURIComponent(searchTerm)}&ready=1&type=story&p=${pageNo}`;

    const res = await fetchApi(searchUrl);
    const text = await res.text();
    const $ = loadCheerio(text);

    return this.parseList($);
  }
}

export default new FanFictionNet();
