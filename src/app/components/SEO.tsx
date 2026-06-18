import { useEffect } from 'react';
import { api } from '../utils/api';

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function setJsonLd(id: string, data: object) {
  let el = document.getElementById(id) as HTMLScriptElement;
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function SEO() {
  useEffect(() => {
    const title = 'Denty Eco | Scooter Elétrica em Joinville SC — Comprar Moto Elétrica';
    const description =
      'Compre sua scooter elétrica ou moto elétrica em Joinville, SC. Denty Eco oferece modelos X13, Urban, Pro e Max com motor até 1000W e bateria de lítio. Atendemos Joinville, Jaraguá do Sul, Blumenau, Itajaí e toda Santa Catarina. 25 anos de experiência em motocicletas.';
    const keywords = [
      // Produto
      'scooter elétrica', 'moto elétrica', 'bike elétrica', 'motocicleta elétrica', 'ciclomotor elétrico',
      'scooter elétrica barata', 'comprar scooter elétrica', 'scooter elétrica 1000w',
      'moto elétrica bateria lítio', 'scooter elétrica lítio', 'moto elétrica removível',
      // Joinville
      'scooter elétrica Joinville', 'moto elétrica Joinville', 'bike elétrica Joinville',
      'comprar moto elétrica Joinville', 'scooter Joinville SC', 'loja scooter elétrica Joinville',
      // Região SC
      'scooter elétrica Santa Catarina', 'moto elétrica SC', 'scooter elétrica Jaraguá do Sul',
      'moto elétrica Blumenau', 'scooter elétrica Itajaí', 'moto elétrica Norte SC',
      'scooter elétrica Balneário Camboriú', 'moto elétrica Florianópolis',
      // Brasil
      'scooter elétrica Brasil', 'moto elétrica Brasil', 'scooter elétrica sul do Brasil',
      'mobilidade elétrica urbana', 'transporte elétrico', 'veículo elétrico duas rodas',
      // Marca
      'Denty Eco', 'Denty Motos', 'X13 elétrica', 'scooter X13',
    ].join(', ');

    const url = 'https://dentyeco.com.br';
    const image = `${url}/scooter-about.png`;

    document.title = title;

    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMeta('author', 'Denty Eco');
    setMeta('geo.region', 'BR-SC');
    setMeta('geo.placename', 'Joinville');
    setMeta('geo.position', '-26.3045;-48.8487');
    setMeta('ICBM', '-26.3045, -48.8487');

    // Open Graph
    setMeta('og:type', 'website', 'property');
    setMeta('og:url', url, 'property');
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:image', image, 'property');
    setMeta('og:image:width', '1200', 'property');
    setMeta('og:image:height', '630', 'property');
    setMeta('og:locale', 'pt_BR', 'property');
    setMeta('og:site_name', 'Denty Eco', 'property');

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);

    setLink('canonical', url);

    // JSON-LD — LocalBusiness
    setJsonLd('ld-business', {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${url}/#business`,
      name: 'Denty Eco',
      alternateName: ['Denty Motos', 'Denty Eco Scooters'],
      description,
      url,
      telephone: '+554730283351',
      email: 'contato@dentyeco.com.br',
      foundingDate: '1999',
      priceRange: 'R$ 3.990 – R$ 7.990',
      currenciesAccepted: 'BRL',
      paymentAccepted: 'Dinheiro, Cartão de crédito, Financiamento',
      image,
      logo: `${url}/logo_denty_eco_branco.png`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Joinville',
        addressLocality: 'Joinville',
        addressRegion: 'SC',
        postalCode: '89200-000',
        addressCountry: 'BR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '-26.3045',
        longitude: '-48.8487',
      },
      areaServed: [
        { '@type': 'City', name: 'Joinville', containedInPlace: { '@type': 'State', name: 'Santa Catarina' } },
        { '@type': 'City', name: 'Jaraguá do Sul' },
        { '@type': 'City', name: 'Blumenau' },
        { '@type': 'City', name: 'Itajaí' },
        { '@type': 'City', name: 'Balneário Camboriú' },
        { '@type': 'City', name: 'Florianópolis' },
        { '@type': 'State', name: 'Santa Catarina' },
        { '@type': 'Country', name: 'Brasil' },
      ],
      sameAs: [
        'https://www.instagram.com/denty_motoss/',
        'https://share.google/XXGTnQnHzdwuje7VK',
      ],
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '18:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '08:00', closes: '12:00' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Scooters e Motos Elétricas',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Scooter Elétrica X13 1000W', description: 'Scooter elétrica de alta performance com motor 1000W e bateria de lítio fixa' }, price: '9990', priceCurrency: 'BRL', availability: 'https://schema.org/InStock', areaServed: 'BR' },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Scooter Elétrica Urban 350W', description: 'Scooter elétrica urbana ideal para o dia a dia com bateria removível' }, price: '3990', priceCurrency: 'BRL', availability: 'https://schema.org/InStock', areaServed: 'BR' },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Scooter Elétrica Pro 500W', description: 'Scooter elétrica com bateria removível de lítio e maior autonomia' }, price: '5490', priceCurrency: 'BRL', availability: 'https://schema.org/InStock', areaServed: 'BR' },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Scooter Elétrica Max 800W', description: 'Scooter elétrica de máxima potência e autonomia' }, price: '7990', priceCurrency: 'BRL', availability: 'https://schema.org/InStock', areaServed: 'BR' },
        ],
      },
    });

    // JSON-LD — WebSite com SearchAction
    setJsonLd('ld-website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${url}/#website`,
      url,
      name: 'Denty Eco',
      description: 'Scooters e motos elétricas em Joinville SC',
      inLanguage: 'pt-BR',
      publisher: { '@id': `${url}/#business` },
    });

    // JSON-LD — BreadcrumbList
    setJsonLd('ld-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: url },
        { '@type': 'ListItem', position: 2, name: 'Modelos', item: `${url}/#modelos` },
        { '@type': 'ListItem', position: 3, name: 'Quem Somos', item: `${url}/#quem-somos` },
        { '@type': 'ListItem', position: 4, name: 'Serviços', item: `${url}/#servicos` },
        { '@type': 'ListItem', position: 5, name: 'Contato', item: `${url}/#contato` },
      ],
    });

  }, []);

  return null;
}
