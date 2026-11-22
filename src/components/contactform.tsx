import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Send, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SERVICE_ID = 'service_f8oz8uk';
const TEMPLATE_ID = 'template_1x54ays';
const AUTO_REPLY_TEMPLATE_ID = 'template_fkpc0nf';
const PUBLIC_KEY = 'Qut9jZ376JK9TYUp6';

const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Keys must match the {{variables}} used in the EmailJS templates.
    // Both naming styles are sent so the notification and auto-reply templates work.
    const templateParams = {
      name: formData.name,
      email: formData.email,
      from_name: formData.name,
      reply_to: formData.email,
      to_email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      await emailjs.send(SERVICE_ID, AUTO_REPLY_TEMPLATE_ID, templateParams, PUBLIC_KEY);

      setIsLoading(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 3000);
    } catch (err) {
      setIsLoading(false);
      console.error('EmailJS Error:', err);
      alert('Failed to send the message. Please try again later.');
    }
  };

  return (
    <div className="border border-[#0b1b2e]/10 bg-white p-6 shadow-[0_1rem_2.5rem_rgba(11,27,46,0.07)] dark:bg-gray-900 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a56d39]">
        DjerbaLens
      </p>
      <h2 className="mb-8 mt-3 font-serif text-3xl font-normal text-[#0b1b2e] dark:text-white">
        {t('common.sendMessage')}
      </h2>

      {isSubmitted ? (
        <div className="text-center py-12">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h3 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
            {t('common.messageSent')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {t('common.thankYou')}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('common.fullName')}
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-[#0b1b2e]/15 bg-[#faf9f6] px-4 py-3 text-[#0b1b2e] transition-colors placeholder:text-[#59636d]/70 focus:border-[#b77a3f] focus:outline-none focus:ring-2 focus:ring-[#b77a3f]/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder={t('common.namePlaceholder')}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('common.email')}
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-[#0b1b2e]/15 bg-[#faf9f6] px-4 py-3 text-[#0b1b2e] transition-colors placeholder:text-[#59636d]/70 focus:border-[#b77a3f] focus:outline-none focus:ring-2 focus:ring-[#b77a3f]/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder={t('common.emailPlaceholder')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('common.phone')}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-[#0b1b2e]/15 bg-[#faf9f6] px-4 py-3 text-[#0b1b2e] transition-colors placeholder:text-[#59636d]/70 focus:border-[#b77a3f] focus:outline-none focus:ring-2 focus:ring-[#b77a3f]/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder={t('common.phonePlaceholder')}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('common.message')}
            </label>
            <textarea
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full resize-none border border-[#0b1b2e]/15 bg-[#faf9f6] px-4 py-3 text-[#0b1b2e] transition-colors placeholder:text-[#59636d]/70 focus:border-[#b77a3f] focus:outline-none focus:ring-2 focus:ring-[#b77a3f]/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              placeholder={t('common.messagePlaceholder')}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex min-h-12 w-full items-center justify-center gap-2 bg-[#b77a3f] px-5 py-3 font-semibold text-white shadow-md transition-colors hover:bg-[#f28c28] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? t('contact.sending') : t('common.send')}
            <Send aria-hidden="true" className="h-4 w-4" />
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;