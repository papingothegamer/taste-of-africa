'use client';

import { useParams } from 'next/navigation';

const staticPages = {
  faq: {
    title: 'Frequently Asked Questions',
    content: [
      { q: 'How do I place an order?', a: 'You can place an order by...' },
      { q: 'What payment methods do you accept?', a: 'We accept...' },
    ]
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    content: 'Our privacy policy...'
  },
  'terms-conditions': {
    title: 'Terms & Conditions',
    content: 'Our terms and conditions...'
  },
  'contact-us': {
    title: 'Contact Us',
    content: 'You can reach us at...'
  }
};

export default function StaticPage() {
  const { page } = useParams();
  const pageData = staticPages[page as keyof typeof staticPages];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{pageData.title}</h1>
      {Array.isArray(pageData.content) ? (
        <div className="space-y-4">
          {pageData.content.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-semibold mb-2">{item.q}</h2>
              <p className="text-gray-600">{item.a}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="prose max-w-none">
          {pageData.content}
        </div>
      )}
    </div>
  );
}
