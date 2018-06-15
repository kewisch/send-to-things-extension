/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Portions Copyright (C) Philipp Kewisch, 2017 */

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.create({
    active: false,
    index: 0,
    url: `things:add?title=${encodeURIComponent(tab.title)}&notes=${encodeURIComponent(tab.url)}`
  }, (newTab) => {
    chrome.tabs.remove(newTab.id);
  });
});
