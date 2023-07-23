/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Portions Copyright (C) Philipp Kewisch, 2017 */

chrome.action.onClicked.addListener(async (tab) => {
  let { quickentry, reveal, when } = await browser.storage.local.get({ quickentry: true, reveal: true, when: "inbox" });

  let url = `things:add?title=${encodeURIComponent(tab.title)}&notes=${encodeURIComponent(tab.url)}&show-quick-entry=${quickentry}&reveal=${reveal}`;

  if (when != "inbox" && !quickentry) {
    url += `&when=${when}`;
  }

  let newTab = await browser.tabs.create({
    active: false,
    index: 0,
    url: url
  });

  let cleanup = function(tabId, changeInfo, tabInfo){
    if(changeInfo.status == "complete") {
      browser.tabs.remove(newTab.id)
    }
  }

  browser.tabs.onUpdated.addListener(cleanup, {tabId: newTab.id})

});
