import { useEffect } from 'react';

declare global {
  interface Window {
    ShopifyBuy: any;
  }
}

interface ShopifyBuyButtonProps {
  productId: string;
  nodeId: string;
}

export default function ShopifyBuyButton({ productId, nodeId }: ShopifyBuyButtonProps) {
  useEffect(() => {
    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

    function initBuyButton(client: any) {
      window.ShopifyBuy.UI.onReady(client).then(function (ui: any) {
        ui.createComponent('product', {
          id: productId,
          node: document.getElementById(nodeId),
          moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
          options: {
            product: {
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin-left": "0",
                    "margin-bottom": "0"
                  }
                },
                button: {
                  "font-family": "Baskerville, serif",
                  ":hover": { "background-color": "#855e59" },
                  "background-color": "#946863",
                  ":focus": { "background-color": "#855e59" },
                  "border-radius": "24px",
                  "padding-left": "22px",
                  "padding-right": "22px"
                }
              },
              contents: {
                img: false,
                title: false,
                price: false
              },
              text: { button: "Ajouter au panier" }
            },
            cart: {
              styles: {
                button: {
                  "font-family": "Baskerville, serif",
                  ":hover": { "background-color": "#855e59" },
                  "background-color": "#946863",
                  ":focus": { "background-color": "#855e59" },
                  "border-radius": "24px"
                }
              },
              text: {
                title: "Panier",
                total: "Sous-total",
                empty: "Panier vide.",
                notice: "",
                button: "Commander"
              }
            }
          }
        });
      });
    }

    function loadScript() {
      const script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
      script.onload = function () {
        const client = window.ShopifyBuy.buildClient({
          domain: 'zybspc-pn.myshopify.com',
          storefrontAccessToken: 'da7ad664342c2e0c37c11f62efab0456',
        });
        initBuyButton(client);
      };
    }

    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        const client = window.ShopifyBuy.buildClient({
          domain: 'zybspc-pn.myshopify.com',
          storefrontAccessToken: 'da7ad664342c2e0c37c11f62efab0456',
        });
        initBuyButton(client);
      } else {
        loadScript();
      }
    } else {
      loadScript();
    }

    return () => {
      const node = document.getElementById(nodeId);
      if (node) {
        while (node.firstChild) {
          node.removeChild(node.firstChild);
        }
      }
    };
  }, [productId, nodeId]);

  return <div id={nodeId}></div>;
}