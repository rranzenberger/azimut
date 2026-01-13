import React, { useState } from 'react'
import { type Lang } from '../i18n'

interface GalleryImage {
  url: string
  alt: string
  thumbnail?: string
}

interface ServiceGalleryProps {
  images: GalleryImage[]
  title?: string
  lang: Lang
}

const ServiceGallery: React.FC<ServiceGalleryProps> = ({ images, title, lang }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  if (!images || images.length === 0) {
    return null
  }

  const translations = {
    pt: { gallery: 'Galeria' },
    en: { gallery: 'Gallery' },
    fr: { gallery: 'Galerie' },
    es: { gallery: 'Galería' }
  }

  const t = translations[lang]

  return (
    <>
      <section className="mb-20">
        {title && (
          <h2 className="mb-8 font-handel text-3xl font-bold uppercase text-theme-text flex items-center gap-3">
            <span className="text-azimut-red">🖼️</span>
            {title || t.gallery}
          </h2>
        )}
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(index)}
              className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              <img
                src={image.thumbnail || image.url}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay no hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              {/* Ícone de zoom */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="rounded-full bg-azimut-red/90 p-4 backdrop-blur-sm">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          {/* Botão fechar */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(null)
            }}
            className="absolute right-4 top-4 rounded-full bg-azimut-red/90 p-3 text-white backdrop-blur-sm transition-all hover:bg-azimut-red"
            aria-label="Fechar"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Navegação anterior */}
          {selectedImage > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(selectedImage - 1)
              }}
              className="absolute left-4 rounded-full bg-azimut-red/90 p-3 text-white backdrop-blur-sm transition-all hover:bg-azimut-red"
              aria-label="Anterior"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Imagem */}
          <img
            src={images[selectedImage].url}
            alt={images[selectedImage].alt}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Navegação próximo */}
          {selectedImage < images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(selectedImage + 1)
              }}
              className="absolute right-4 rounded-full bg-azimut-red/90 p-3 text-white backdrop-blur-sm transition-all hover:bg-azimut-red"
              aria-label="Próximo"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}

          {/* Indicador de posição */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-slate-900/90 px-4 py-2 text-sm text-white backdrop-blur-sm">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}

export default ServiceGallery
