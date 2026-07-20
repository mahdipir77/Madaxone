        // Header solidifies on scroll
        const header = document.getElementById('site-header');
        const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
        document.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        // Close mobile nav after a link is tapped
        document.querySelectorAll('.main-nav a').forEach(a => {
            a.addEventListener('click', () => {
                document.getElementById('nav-toggle').checked = false;
            });
        });

        // ============ Services dropdown ============
        document.querySelectorAll('.nav-dropdown-trigger').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const parent = btn.closest('.nav-dropdown');
                const isOpen = parent.classList.toggle('is-open');
                btn.setAttribute('aria-expanded', String(isOpen));
            });
        });
        document.addEventListener('click', (e) => {
            document.querySelectorAll('.nav-dropdown.is-open').forEach(dd => {
                if (!dd.contains(e.target)) {
                    dd.classList.remove('is-open');
                    dd.querySelector('.nav-dropdown-trigger').setAttribute('aria-expanded', 'false');
                }
            });
        });

        // ============ Live REC timecode ============
        const timecodeEl = document.getElementById('rec-timecode');
        if (timecodeEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const FPS = 24;
            const startTime = performance.now();
            const pad = (n) => String(n).padStart(2, '0');
            setInterval(() => {
                const totalFrames = Math.floor((performance.now() - startTime) / 1000 * FPS);
                const frames = totalFrames % FPS;
                const totalSeconds = Math.floor(totalFrames / FPS);
                const seconds = totalSeconds % 60;
                const totalMinutes = Math.floor(totalSeconds / 60);
                const minutes = totalMinutes % 60;
                const hours = Math.floor(totalMinutes / 60);
                timecodeEl.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
            }, 1000 / FPS);
        }

        // ============ i18n ============
        const pagesI18nEn = {
            commercialFilming: { title: "Commercial Filming", sub: "Brand films and campaign video, shot to hold attention and built to convert.", body1: "We produce commercial video for brands that need footage which performs as well on a feed as it does on a landing page — paid social cuts, hero videos, and campaign films built from a single production day.", body2: "Every shoot starts with the placement in mind. A 15-second cutdown and a 90-second brand film are planned together on set, not improvised in the edit.", list0: "Brand and campaign films", list1: "Paid social cutdowns", list2: "On-location or studio production", list3: "Same-day and rapid-turnaround options", caption0: "Brand film — 30s cut", caption1: "Product launch teaser", caption2: "Social campaign edit", caption3: "Behind the scenes", caption4: "Corporate brand video", caption5: "Event highlight reel" },
            commercialPhotography: { title: "Commercial Photography", sub: "Campaign-ready stills for brands that need to look as good as they perform.", body1: "From product hero shots to full campaign sets, our commercial photography is lit and composed for how it will actually be used — web banners, packaging, paid ads, and print.", body2: "We deliver a complete asset library from a single session, so one shoot covers a full quarter of marketing content.", list0: "Product and lifestyle photography", list1: "Campaign asset sets", list2: "Studio and on-location", list3: "Retouching and color grading included", caption0: "Product hero shot", caption1: "Lifestyle campaign set", caption2: "Packaging photography", caption3: "Studio product series", caption4: "Campaign lookbook still", caption5: "Detail and texture shots" },
            fashionPhotography: { title: "Fashion Photography", sub: "Editorial-grade imagery for labels, lookbooks, and seasonal drops.", body1: "We shoot fashion photography built for the editorial standard — considered lighting, wardrobe-first styling coordination, and a finished grade that holds up next to any magazine spread.", body2: "Whether it's a lookbook, a seasonal campaign, or e-commerce product imagery, the work is planned around how the collection will actually be sold and seen.", list0: "Lookbooks and seasonal campaigns", list1: "E-commerce and catalog imagery", list2: "Studio and location shoots", list3: "Full retouching and color grading", caption0: "Seasonal lookbook", caption1: "Editorial fashion set", caption2: "E-commerce product shots", caption3: "Studio fashion series", caption4: "Location fashion shoot", caption5: "Campaign cover image" },
            realEstateFilming: { title: "Real Estate Filming", sub: "Cinematic property films that turn listings into destinations.", body1: "A property film from Madaxone is built like a short film, not a walkthrough — considered pacing, a score, and shot composition that sells the feeling of the space, not just its square footage.", body2: "Every real estate film is cut in both a full cinematic version for listing pages and a short vertical version for social and outreach.", list0: "Cinematic property teasers", list1: "Full walkthrough films", list2: "Vertical cuts for social", list3: "Same-week turnaround available", caption0: "Villa cinematic teaser", caption1: "Apartment walkthrough film", caption2: "Luxury listing film", caption3: "New development teaser", caption4: "Coastal property film", caption5: "Interior showcase film" },
            realEstatePhotography: { title: "Real Estate Photography", sub: "Listing photography that makes a property the first one clicked.", body1: "Wide, true-to-light interior and exterior photography, shot and edited for how buyers actually browse listings — bright, accurate, and composed to show scale.", body2: "We deliver a complete listing set, from the hero exterior shot to detail frames, ready for MLS and marketing the same day.", list0: "Interior and exterior photography", list1: "Twilight and dusk shots", list2: "HDR and true-to-light editing", list3: "MLS-ready delivery", caption0: "Interior listing photos", caption1: "Exterior hero shot", caption2: "Twilight photography", caption3: "Detail and finish shots", caption4: "Full listing photo set", caption5: "Staged interior series" },
            realEstateDrone: { title: "Aerial / Drone", sub: "Aerial footage and photography that gives a property its context.", body1: "Aerial coverage shows what ground-level shots can't — lot size, neighborhood, proximity to the coastline or skyline, and the property's place in its surroundings.", body2: "Licensed drone pilots capture both photo and video coverage in a single flight, integrated directly into the property film and listing photo set.", list0: "Aerial photography and video", list1: "Licensed, insured drone operation", list2: "Neighborhood and lot context shots", list3: "Integrated with property films", caption0: "Aerial property overview", caption1: "Neighborhood context shot", caption2: "Coastal aerial footage", caption3: "Land and lot survey", caption4: "Aerial video flyover", caption5: "Rooftop and skyline view" },
            realEstateTours: { title: "360° Virtual Tours & Mapping", sub: "Interactive walkthroughs that let a buyer tour the property before they arrive.", body1: "Full 360° virtual tours and floor-plan mapping let a buyer walk through every room on their own time, from anywhere — cutting down unqualified showings and pre-selling serious buyers before they set foot inside.", body2: "Delivered as an embeddable, shareable tour link, ready to drop directly into a listing page.", list0: "Full 360° interactive tours", list1: "Accurate floor-plan mapping", list2: "Embeddable listing-page tours", list3: "Measurement and square-footage data", caption0: "Full property 360° tour", caption1: "Interactive floor plan", caption2: "Room-by-room walkthrough", caption3: "Virtual open house", caption4: "Mapped square footage", caption5: "Embeddable tour preview" },
            digitalWebDesign: { title: "Custom Web Design", sub: "Bespoke websites, designed to hold everything else we shoot.", body1: "We design and build custom websites — not templates — engineered around a brand's actual visual assets, from a single-page portfolio to a full multi-page site with a real navigation structure.", body2: "Every site is designed mobile-first, fast to load, and structured so new pages, projects, and languages can be added without a rebuild.", list0: "Bespoke, brand-specific design", list1: "Mobile-first and responsive", list2: "Multilingual support", list3: "Built for real content, not templates", caption0: "Single-page portfolio site", caption1: "Multi-page brand website", caption2: "E-commerce site design", caption3: "Mobile-first layout", caption4: "Custom brand landing page", caption5: "Multilingual site design" },
            digitalDevelopment: { title: "Development", sub: "The engineering behind a site that actually works.", body1: "From front-end build to hosting and domain setup, we handle the technical side of getting a site live — clean code, fast load times, and a structure that's simple to maintain going forward.", body2: "We work with whatever a client already has in place, or set up the full stack from a blank domain.", list0: "Front-end development", list1: "Domain and hosting setup", list2: "Performance optimization", list3: "Ongoing maintenance available", caption0: "Front-end build", caption1: "Site performance optimization", caption2: "Domain and hosting setup", caption3: "Custom CMS integration", caption4: "Site migration project", caption5: "Ongoing maintenance work" },
            digitalPresence: { title: "Digital Presence", sub: "Making sure the work we shoot actually gets seen.", body1: "A great film or photo set only works if it reaches the right audience. We help brands structure their digital presence — from social profiles to SEO basics — so the content we produce keeps working long after delivery.", body2: "This isn't a full marketing agency service — it's the connective layer between production and platform, done right from the start.", list0: "Social profile and content structure", list1: "Basic on-page SEO setup", list2: "Content distribution planning", list3: "Analytics and tracking setup", caption0: "Social profile setup", caption1: "On-page SEO structure", caption2: "Content distribution plan", caption3: "Analytics dashboard setup", caption4: "Brand presence audit", caption5: "Cross-platform content plan" },
        };
        const pagesI18nEs = {
            commercialFilming: { title: "Filmación Comercial", sub: "Películas de marca y video de campaña, filmados para captar la atención y creados para convertir.", body1: "Producimos video comercial para marcas que necesitan material que funcione tan bien en un feed como en una landing page — cortes para redes pagadas, videos hero y películas de campaña, todo desde un solo día de producción.", body2: "Cada rodaje se planea pensando en dónde se usará. Un corte de 15 segundos y una película de marca de 90 segundos se planifican juntos en el set, no se improvisan en la edición.", list0: "Películas de marca y campaña", list1: "Cortes para redes pagadas", list2: "Producción en locación o estudio", list3: "Entrega el mismo día u opciones rápidas" , caption0: "Película de marca — corte de 30s", caption1: "Teaser de lanzamiento de producto", caption2: "Edición para campaña social", caption3: "Detrás de cámaras", caption4: "Video corporativo de marca", caption5: "Reel de evento destacado" },
            commercialPhotography: { title: "Fotografía Comercial", sub: "Fotos listas para campaña, para marcas que necesitan verse tan bien como rinden.", body1: "Desde tomas hero de producto hasta sets completos de campaña, nuestra fotografía comercial está iluminada y compuesta para cómo realmente se usará — banners web, empaques, anuncios pagados e impresos.", body2: "Entregamos una biblioteca completa de assets desde una sola sesión, así una sesión cubre todo un trimestre de contenido de marketing.", list0: "Fotografía de producto y lifestyle", list1: "Sets de assets de campaña", list2: "Estudio y en locación", list3: "Retoque y corrección de color incluidos" , caption0: "Toma hero de producto", caption1: "Set de campaña lifestyle", caption2: "Fotografía de empaque", caption3: "Serie de producto en estudio", caption4: "Foto de lookbook de campaña", caption5: "Tomas de detalle y textura" },
            fashionPhotography: { title: "Fotografía de Moda", sub: "Imágenes de nivel editorial para marcas, lookbooks y lanzamientos de temporada.", body1: "Hacemos fotografía de moda con estándar editorial — iluminación cuidada, coordinación de estilismo centrada en el vestuario, y un acabado que se sostiene junto a cualquier editorial de revista.", body2: "Ya sea un lookbook, una campaña de temporada o imágenes de producto para e-commerce, el trabajo se planea según cómo realmente se venderá y se verá la colección.", list0: "Lookbooks y campañas de temporada", list1: "Imágenes para e-commerce y catálogo", list2: "Sesiones en estudio y en locación", list3: "Retoque y corrección de color completos" , caption0: "Lookbook de temporada", caption1: "Set editorial de moda", caption2: "Fotos de producto e-commerce", caption3: "Serie de moda en estudio", caption4: "Sesión de moda en locación", caption5: "Imagen de portada de campaña" },
            realEstateFilming: { title: "Filmación de Bienes Raíces", sub: "Películas cinematográficas de propiedades que convierten anuncios en destinos.", body1: "Una película de propiedad de Madaxone está construida como un cortometraje, no como un recorrido — ritmo cuidado, música y composición de planos que venden la sensación del espacio, no solo sus metros cuadrados.", body2: "Cada película inmobiliaria se edita en una versión cinematográfica completa para la página del anuncio y una versión corta vertical para redes sociales y difusión.", list0: "Teasers cinematográficos de propiedades", list1: "Películas de recorrido completo", list2: "Cortes verticales para redes sociales", list3: "Entrega disponible en la misma semana" , caption0: "Teaser cinematográfico de villa", caption1: "Película de recorrido de apartamento", caption2: "Película de listado de lujo", caption3: "Teaser de nuevo desarrollo", caption4: "Película de propiedad costera", caption5: "Película de interiores" },
            realEstatePhotography: { title: "Fotografía Inmobiliaria", sub: "Fotografía de anuncios que hace que una propiedad sea la primera en la que hacen clic.", body1: "Fotografía interior y exterior amplia y fiel a la luz real, tomada y editada para cómo los compradores realmente navegan los anuncios — brillante, precisa y compuesta para mostrar la escala.", body2: "Entregamos un set completo para el anuncio, desde la toma exterior principal hasta los detalles, listo para MLS y marketing el mismo día.", list0: "Fotografía interior y exterior", list1: "Tomas al atardecer", list2: "Edición HDR fiel a la luz real", list3: "Entrega lista para MLS" , caption0: "Fotos de interior para listado", caption1: "Toma exterior principal", caption2: "Fotografía al atardecer", caption3: "Tomas de detalle y acabados", caption4: "Set fotográfico completo", caption5: "Serie de interior decorado" },
            realEstateDrone: { title: "Aéreo / Dron", sub: "Video y fotografía aérea que le da contexto a una propiedad.", body1: "La cobertura aérea muestra lo que las tomas a nivel de suelo no pueden — el tamaño del terreno, el vecindario, la cercanía a la costa o al horizonte, y el lugar de la propiedad dentro de su entorno.", body2: "Pilotos de dron con licencia capturan foto y video en un solo vuelo, integrados directamente en la película de la propiedad y el set fotográfico del anuncio.", list0: "Fotografía y video aéreo", list1: "Operación de dron con licencia y seguro", list2: "Tomas de contexto de vecindario y terreno", list3: "Integrado con las películas de propiedad" , caption0: "Vista aérea de la propiedad", caption1: "Toma de contexto del vecindario", caption2: "Video aéreo costero", caption3: "Estudio de terreno y lote", caption4: "Sobrevuelo en video aéreo", caption5: "Vista de azotea y horizonte" },
            realEstateTours: { title: "Tours Virtuales 360° y Mapeo", sub: "Recorridos interactivos que permiten al comprador visitar la propiedad antes de llegar.", body1: "Los tours virtuales 360° completos y el mapeo de planos permiten a un comprador recorrer cada habitación a su propio ritmo, desde cualquier lugar — reduciendo visitas no calificadas y pre-vendiendo a compradores serios antes de que pisen la propiedad.", body2: "Se entrega como un link de tour incrustable y compartible, listo para colocar directamente en la página del anuncio.", list0: "Tours interactivos 360° completos", list1: "Mapeo preciso de planos", list2: "Tours incrustables en la página del anuncio", list3: "Datos de medición y metraje" , caption0: "Tour 360° completo de la propiedad", caption1: "Plano interactivo", caption2: "Recorrido habitación por habitación", caption3: "Casa abierta virtual", caption4: "Metraje mapeado", caption5: "Vista previa de tour incrustable" },
            digitalWebDesign: { title: "Diseño Web a Medida", sub: "Sitios web a medida, diseñados para alojar todo lo demás que filmamos.", body1: "Diseñamos y construimos sitios web personalizados — no plantillas — creados alrededor de los activos visuales reales de la marca, desde un portafolio de una sola página hasta un sitio completo multi-página con una estructura de navegación real.", body2: "Cada sitio está diseñado mobile-first, con carga rápida, y estructurado para que se puedan agregar nuevas páginas, proyectos e idiomas sin reconstruir todo.", list0: "Diseño a medida y específico de marca", list1: "Mobile-first y responsivo", list2: "Soporte multilingüe", list3: "Construido para contenido real, no plantillas" , caption0: "Portafolio de una página", caption1: "Sitio web de marca multi-página", caption2: "Diseño de sitio e-commerce", caption3: "Diseño mobile-first", caption4: "Landing page de marca a medida", caption5: "Diseño de sitio multilingüe" },
            digitalDevelopment: { title: "Desarrollo", sub: "La ingeniería detrás de un sitio que realmente funciona.", body1: "Desde la construcción del front-end hasta la configuración de hosting y dominio, nos encargamos del lado técnico de poner un sitio en línea — código limpio, tiempos de carga rápidos y una estructura simple de mantener a futuro.", body2: "Trabajamos con lo que el cliente ya tenga, o configuramos todo el stack desde un dominio en blanco.", list0: "Desarrollo front-end", list1: "Configuración de dominio y hosting", list2: "Optimización de rendimiento", list3: "Mantenimiento continuo disponible" , caption0: "Construcción front-end", caption1: "Optimización de rendimiento", caption2: "Configuración de dominio y hosting", caption3: "Integración de CMS a medida", caption4: "Proyecto de migración de sitio", caption5: "Mantenimiento continuo" },
            digitalPresence: { title: "Presencia Digital", sub: "Asegurando que el trabajo que filmamos realmente sea visto.", body1: "Una gran película o set de fotos solo funciona si llega a la audiencia correcta. Ayudamos a las marcas a estructurar su presencia digital — desde perfiles sociales hasta SEO básico — para que el contenido que producimos siga funcionando mucho después de la entrega.", body2: "Esto no es un servicio completo de agencia de marketing — es la capa de conexión entre la producción y la plataforma, hecha bien desde el principio.", list0: "Estructura de perfiles sociales y contenido", list1: "Configuración básica de SEO en la página", list2: "Planificación de distribución de contenido", list3: "Configuración de analítica y seguimiento" , caption0: "Configuración de perfil social", caption1: "Estructura de SEO en la página", caption2: "Plan de distribución de contenido", caption3: "Configuración de panel de analítica", caption4: "Auditoría de presencia de marca", caption5: "Plan de contenido multiplataforma" },
        };
        const pagesI18nFa = {
            commercialFilming: { title: "فیلم‌برداری تبلیغاتی", sub: "فیلم‌های برند و ویدیوی کمپین، فیلم‌برداری‌شده برای جلب توجه و ساخته‌شده برای تبدیل مخاطب به مشتری.", body1: "ما ویدیوی تبلیغاتی برای برندهایی تولید می‌کنیم که به محتوایی نیاز دارند که هم توی فید شبکه‌های اجتماعی و هم توی صفحه‌ی فرود عملکرد خوبی داشته باشه — کلیپ‌های تبلیغات پولی، ویدیوهای هیرو، و فیلم‌های کمپین، همه از یک روز تولید.", body2: "هر فیلم‌برداری با در نظر گرفتن محل نمایش نهایی شروع می‌شه. یه کلیپ ۱۵ ثانیه‌ای و یه فیلم برند ۹۰ ثانیه‌ای با هم روی ست برنامه‌ریزی می‌شن، نه این‌که توی تدوین بداهه ساخته بشن.", list0: "فیلم برند و کمپین", list1: "کلیپ‌های تبلیغات پولی شبکه‌های اجتماعی", list2: "تولید در لوکیشن یا استودیو", list3: "تحویل همان‌روز یا گزینه‌های سریع" , caption0: "فیلم برند — کلیپ ۳۰ ثانیه‌ای", caption1: "تیزر معرفی محصول", caption2: "کلیپ کمپین شبکه‌های اجتماعی", caption3: "پشت صحنه", caption4: "ویدیوی شرکتی برند", caption5: "خلاصه‌ی رویداد" },
            commercialPhotography: { title: "عکاسی تبلیغاتی", sub: "عکس‌های آماده‌ی کمپین، برای برندهایی که باید دقیقاً به همان خوبی که عملکردشان هست دیده شوند.", body1: "از شات‌های هیرو محصول تا ست‌های کامل کمپین، عکاسی تبلیغاتی ما با نورپردازی و ترکیب‌بندی متناسب با محل استفاده‌ی واقعیش انجام می‌شه — بنر وب، بسته‌بندی، تبلیغات پولی و چاپ.", body2: "ما یه کتابخانه‌ی کامل از تصاویر رو فقط از یک نشست تحویل می‌دیم، پس یه جلسه‌ی عکاسی کل یک فصل از محتوای مارکتینگ رو پوشش می‌ده.", list0: "عکاسی محصول و لایف‌استایل", list1: "ست‌های تصویری کمپین", list2: "استودیو و لوکیشن", list3: "روتوش و رنگ‌آمیزی شامل می‌شه" , caption0: "شات هیرو محصول", caption1: "ست کمپین لایف‌استایل", caption2: "عکاسی بسته‌بندی", caption3: "سری محصول استودیویی", caption4: "عکس لوک‌بوک کمپین", caption5: "شات‌های جزئیات و بافت" },
            fashionPhotography: { title: "عکاسی فشن", sub: "تصاویری در سطح ادیتوریال، برای برندها، لوک‌بوک‌ها و کالکشن‌های فصلی.", body1: "ما عکاسی فشن رو در استاندارد ادیتوریال انجام می‌دیم — نورپردازی دقیق، هماهنگی استایلینگ با محوریت لباس، و ادیت نهایی‌ای که کنار هر مجله‌ی فشن هم بدرخشه.", body2: "چه یه لوک‌بوک باشه، چه یه کمپین فصلی یا تصاویر محصول برای فروشگاه آنلاین، کار بر اساس این‌که کالکشن واقعاً چطور فروخته و دیده می‌شه برنامه‌ریزی می‌شه.", list0: "لوک‌بوک و کمپین فصلی", list1: "تصاویر فروشگاه آنلاین و کاتالوگ", list2: "عکاسی استودیویی و لوکیشن", list3: "روتوش و رنگ‌آمیزی کامل" , caption0: "لوک‌بوک فصلی", caption1: "ست ادیتوریال فشن", caption2: "عکس محصول فروشگاه آنلاین", caption3: "سری فشن استودیویی", caption4: "عکاسی فشن در لوکیشن", caption5: "تصویر کاور کمپین" },
            realEstateFilming: { title: "فیلم‌برداری املاک", sub: "فیلم‌های سینمایی املاک که آگهی‌ها را به مقصد تبدیل می‌کند.", body1: "فیلم ملک در مادکسون مثل یه فیلم کوتاه ساخته می‌شه، نه یه تور ساده — ریتم حساب‌شده، موسیقی، و ترکیب‌بندی نمایی که حس فضا رو می‌فروشه، نه فقط متراژش رو.", body2: "هر فیلم املاک هم به شکل نسخه‌ی کامل سینمایی برای صفحه‌ی آگهی، هم نسخه‌ی کوتاه عمودی برای شبکه‌های اجتماعی تدوین می‌شه.", list0: "تیزر سینمایی ملک", list1: "فیلم کامل تور ملک", list2: "نسخه‌ی عمودی برای شبکه‌های اجتماعی", list3: "امکان تحویل در همان هفته" , caption0: "تیزر سینمایی ویلا", caption1: "فیلم تور آپارتمان", caption2: "فیلم آگهی لوکس", caption3: "تیزر پروژه‌ی جدید", caption4: "فیلم ملک ساحلی", caption5: "فیلم نمایش داخلی" },
            realEstatePhotography: { title: "عکاسی املاک", sub: "عکاسی آگهی که ملک را اولین گزینه‌ی کلیک‌شده می‌کند.", body1: "عکاسی داخلی و خارجی با زاویه‌ی باز و نور طبیعی، گرفته و ادیت‌شده متناسب با نحوه‌ی واقعی مرور آگهی‌ها توسط خریداران — روشن، دقیق و با ترکیب‌بندی‌ای که مقیاس فضا رو نشون می‌ده.", body2: "ما یه ست کامل از عکس‌های آگهی، از شات اصلی نمای بیرونی تا فریم‌های جزئیات، آماده برای MLS و بازاریابی، همون‌روز تحویل می‌دیم.", list0: "عکاسی داخلی و خارجی", list1: "شات‌های غروب و سپیده‌دم", list2: "ادیت HDR با نور طبیعی", list3: "تحویل آماده برای MLS" , caption0: "عکس داخلی آگهی", caption1: "شات اصلی نمای بیرونی", caption2: "عکاسی غروب", caption3: "شات‌های جزئیات و متریال", caption4: "ست کامل عکس آگهی", caption5: "سری داخلی چیدمان‌شده" },
            realEstateDrone: { title: "هوایی / پهپاد", sub: "تصویربرداری هوایی که به ملک زمینه و بافت می‌دهد.", body1: "پوشش هوایی چیزی رو نشون می‌ده که شات‌های زمینی نمی‌تونن — اندازه‌ی زمین، محله، نزدیکی به ساحل یا خط افق شهر، و جایگاه ملک در محیط اطرافش.", body2: "خلبان‌های مجاز پهپاد، عکس و ویدیو رو در یک پرواز می‌گیرند، که مستقیم توی فیلم ملک و ست عکس آگهی ادغام می‌شه.", list0: "عکاسی و فیلم‌برداری هوایی", list1: "بهره‌برداری مجاز و بیمه‌شده‌ی پهپاد", list2: "شات‌های زمینه‌ی محله و زمین", list3: "ادغام‌شده با فیلم‌های ملک" , caption0: "نمای هوایی ملک", caption1: "شات زمینه‌ی محله", caption2: "فیلم هوایی ساحلی", caption3: "بررسی زمین و قطعه", caption4: "پرواز فیلم‌برداری هوایی", caption5: "نمای پشت‌بام و خط افق" },
            realEstateTours: { title: "تور مجازی ۳۶۰ درجه و نقشه‌برداری", sub: "تورهای تعاملی که به خریدار اجازه می‌دهد پیش از حضور فیزیکی، ملک را ببیند.", body1: "تور مجازی کامل ۳۶۰ درجه و نقشه‌برداری از پلان، به خریدار اجازه می‌ده هر اتاق رو با سرعت خودش و از هر جایی ببینه — این باعث کاهش بازدیدهای غیرجدی و متقاعد کردن خریداران جدی پیش از حضورشون می‌شه.", body2: "این تور به‌صورت یه لینک قابل‌جاسازی و قابل‌اشتراک‌گذاری تحویل داده می‌شه، آماده برای قرار گرفتن مستقیم توی صفحه‌ی آگهی.", list0: "تور تعاملی کامل ۳۶۰ درجه", list1: "نقشه‌برداری دقیق از پلان", list2: "تور قابل‌جاسازی در صفحه‌ی آگهی", list3: "داده‌ی اندازه‌گیری و متراژ" , caption0: "تور کامل ۳۶۰ درجه‌ی ملک", caption1: "پلان تعاملی", caption2: "تور اتاق‌به‌اتاق", caption3: "بازدید مجازی خانه", caption4: "متراژ نقشه‌برداری‌شده", caption5: "پیش‌نمایش تور قابل‌جاسازی" },
            digitalWebDesign: { title: "طراحی وب اختصاصی", sub: "وب‌سایت‌های اختصاصی، طراحی‌شده برای میزبانی هر چیز دیگری که تولید می‌کنیم.", body1: "ما وب‌سایت‌های اختصاصی طراحی و می‌سازیم — نه قالب آماده — که حول محور دارایی‌های بصری واقعی برند مهندسی شدن، از یه پورتفولیوی تک‌صفحه‌ای تا یه سایت چندصفحه‌ای کامل با ساختار ناوبری واقعی.", body2: "هر سایت با اولویت موبایل، سریع، و طوری ساخته می‌شه که بشه صفحه، پروژه و زبان جدید بدون بازسازی کامل بهش اضافه کرد.", list0: "طراحی اختصاصی و متناسب با برند", list1: "اولویت موبایل و ریسپانسیو", list2: "پشتیبانی چندزبانه", list3: "ساخته‌شده برای محتوای واقعی، نه قالب آماده" , caption0: "پورتفولیوی تک‌صفحه‌ای", caption1: "سایت برند چندصفحه‌ای", caption2: "طراحی سایت فروشگاهی", caption3: "طراحی اولویت‌موبایل", caption4: "لندینگ‌پیج اختصاصی برند", caption5: "طراحی سایت چندزبانه" },
            digitalDevelopment: { title: "توسعه", sub: "مهندسی پشت یک سایتی که واقعاً کار می‌کند.", body1: "از ساخت فرانت‌اند تا تنظیم هاست و دامنه، ما بخش فنی آنلاین‌کردن یه سایت رو انجام می‌دیم — کد تمیز، زمان لود سریع، و ساختاری که نگه‌داریش در آینده ساده باشه.", body2: "ما با هر چیزی که مشتری از قبل داره کار می‌کنیم، یا کل زیرساخت رو از یه دامنه‌ی خالی راه‌اندازی می‌کنیم.", list0: "توسعه‌ی فرانت‌اند", list1: "راه‌اندازی دامنه و هاست", list2: "بهینه‌سازی عملکرد", list3: "امکان نگهداری مستمر" , caption0: "ساخت فرانت‌اند", caption1: "بهینه‌سازی عملکرد", caption2: "راه‌اندازی دامنه و هاست", caption3: "یکپارچه‌سازی CMS اختصاصی", caption4: "پروژه‌ی مهاجرت سایت", caption5: "نگهداری مستمر" },
            digitalPresence: { title: "حضور دیجیتال", sub: "اطمینان از اینکه کاری که تولید می‌کنیم واقعاً دیده می‌شود.", body1: "یه فیلم یا ست عکس عالی فقط وقتی جواب می‌ده که به مخاطب درست برسه. ما به برندها کمک می‌کنیم حضور دیجیتالشون رو ساختاردهی کنن — از پروفایل شبکه‌های اجتماعی تا اصول سئو — تا محتوایی که تولید می‌کنیم، مدت‌ها بعد از تحویل هم اثرگذار بمونه.", body2: "این یه سرویس کامل آژانس مارکتینگ نیست — این لایه‌ی اتصال بین تولید و پلتفرمه، که از همون ابتدا درست انجام می‌شه.", list0: "ساختاردهی پروفایل و محتوای شبکه‌های اجتماعی", list1: "تنظیمات پایه‌ی سئو داخل صفحه", list2: "برنامه‌ریزی توزیع محتوا", list3: "راه‌اندازی آنالیتیکس و ردیابی" , caption0: "راه‌اندازی پروفایل شبکه‌ی اجتماعی", caption1: "ساختار سئوی درون‌صفحه", caption2: "برنامه‌ی توزیع محتوا", caption3: "راه‌اندازی داشبورد آنالیتیکس", caption4: "ممیزی حضور برند", caption5: "برنامه‌ی محتوای چندپلتفرمی" },
        };

        const translations = {
            en: {
                nav: {
                    work: "Work", services: "Services", studio: "Studio", cta: "Start a Project",
                    cat: { commercial: "Commercial", fashion: "Fashion", realestate: "Real Estate", digital: "Digital" },
                    item: { filming: "Filming", photography: "Photography", drone: "Drone", tours: "360° Virtual Tours / Mapping", webdesign: "Custom Web Design", development: "Development", presence: "Digital Presence" }
                },
                hero: {
                    eyebrow: "Visual Business Development Studio",
                    title: "We shoot the story<br>your business <em>hasn't</em><br>told yet.",
                    sub: "Madaxone builds the visual and digital assets that move real estate, brands, and businesses forward — from cinematic property films to the websites built to hold them.",
                    cta1: "Start a Project",
                    cta2: "View the Work"
                },
                services: {
                    eyebrow: "What We Do",
                    title: "Three lenses. One studio.",
                    s1: { title: "Real Estate Media", desc: "Cinematic property films, aerial drone footage, and 360° virtual tours that turn listings into destinations people want to walk through twice.", tag1: "Cinematic Teasers", tag2: "Aerial / Drone", tag3: "360° Virtual Tours" },
                    s2: { title: "Commercial & Fashion", desc: "Campaign-ready photography and video for brands that need to look exactly as good as they perform — in-studio or on location.", tag1: "Brand Films", tag2: "Fashion Editorial", tag3: "Product Content" },
                    s3: { title: "Digital Infrastructure", desc: "Bespoke websites engineered to hold everything we shoot — fast, minimal, and built to convert visitors into clients.", tag1: "Custom Web Design", tag2: "Development", tag3: "Digital Presence" }
                },
                work: {
                    eyebrow: "Selected Frames",
                    title: "A studio built on three lenses,<br>shown in motion.",
                    f1: "REAL ESTATE", f2: "FASHION", f3: "AERIAL", f4: "DIGITAL"
                },
                process: {
                    eyebrow: "The Studio",
                    title: "How a project moves through Madaxone.",
                    p1: { title: "Brief", desc: "We learn the business, the property, or the brand before we ever pick up a camera." },
                    p2: { title: "Shoot", desc: "On location or in studio — ground, air, and 360° coverage captured in a single pass." },
                    p3: { title: "Cut", desc: "Edited and color-graded into a piece built for how it will actually be seen." },
                    p4: { title: "Launch", desc: "Delivered to your platforms — or placed on a site we've built to hold it." }
                },
                contact: {
                    eyebrow: "Let's Build",
                    title: "Tell us what<br>you're building.",
                    sub: "Every project starts with a five-minute conversation, not a proposal deck."
                },
                footer: { contact: "Contact", meta: "© 2026 MADAXONE — VISUAL BUSINESS DEVELOPMENT" },
                pages: Object.assign({ samplesEyebrow: "Sample Work" }, pagesI18nEn)
            },
            es: {
                nav: {
                    work: "Trabajo", services: "Servicios", studio: "Estudio", cta: "Iniciar Proyecto",
                    cat: { commercial: "Comercial", fashion: "Moda", realestate: "Inmobiliario", digital: "Digital" },
                    item: { filming: "Filmación", photography: "Fotografía", drone: "Dron", tours: "Tours Virtuales 360° / Mapeo", webdesign: "Diseño Web a Medida", development: "Desarrollo", presence: "Presencia Digital" }
                },
                hero: {
                    eyebrow: "Estudio de Desarrollo Visual de Negocios",
                    title: "Filmamos la historia<br>que tu negocio <em>aún no</em><br>ha contado.",
                    sub: "Madaxone crea los activos visuales y digitales que impulsan bienes raíces, marcas y negocios — desde películas cinematográficas de propiedades hasta los sitios web que las alojan.",
                    cta1: "Iniciar Proyecto",
                    cta2: "Ver el Trabajo"
                },
                services: {
                    eyebrow: "Qué Hacemos",
                    title: "Tres lentes. Un estudio.",
                    s1: { title: "Medios Inmobiliarios", desc: "Películas cinematográficas de propiedades, tomas aéreas con dron y tours virtuales en 360° que convierten anuncios en destinos que la gente quiere recorrer dos veces.", tag1: "Teasers Cinematográficos", tag2: "Aéreo / Dron", tag3: "Tours Virtuales 360°" },
                    s2: { title: "Comercial y Moda", desc: "Fotografía y video listos para campaña, para marcas que necesitan verse exactamente tan bien como rinden — en estudio o en locación.", tag1: "Películas de Marca", tag2: "Editorial de Moda", tag3: "Contenido de Producto" },
                    s3: { title: "Infraestructura Digital", desc: "Sitios web a medida, diseñados para alojar todo lo que filmamos — rápidos, minimalistas y construidos para convertir visitantes en clientes.", tag1: "Diseño Web a Medida", tag2: "Desarrollo", tag3: "Presencia Digital" }
                },
                work: {
                    eyebrow: "Tomas Seleccionadas",
                    title: "Un estudio construido sobre tres lentes,<br>mostrado en movimiento.",
                    f1: "INMOBILIARIO", f2: "MODA", f3: "AÉREO", f4: "DIGITAL"
                },
                process: {
                    eyebrow: "El Estudio",
                    title: "Cómo avanza un proyecto en Madaxone.",
                    p1: { title: "Briefing", desc: "Conocemos el negocio, la propiedad o la marca antes de tomar la cámara." },
                    p2: { title: "Rodaje", desc: "En locación o en estudio — cobertura terrestre, aérea y 360° capturada en una sola sesión." },
                    p3: { title: "Edición", desc: "Editado y con corrección de color para la pieza tal como realmente se verá." },
                    p4: { title: "Lanzamiento", desc: "Entregado a tus plataformas — o publicado en un sitio que construimos para alojarlo." }
                },
                contact: {
                    eyebrow: "Construyamos",
                    title: "Cuéntanos qué<br>estás construyendo.",
                    sub: "Cada proyecto comienza con una conversación de cinco minutos, no con una propuesta comercial."
                },
                footer: { contact: "Contacto", meta: "© 2026 MADAXONE — DESARROLLO VISUAL DE NEGOCIOS" },
                pages: Object.assign({ samplesEyebrow: "Trabajo de Muestra" }, pagesI18nEs)
            },
            fa: {
                nav: {
                    work: "نمونه‌کارها", services: "خدمات", studio: "استودیو", cta: "شروع پروژه",
                    cat: { commercial: "تبلیغاتی", fashion: "فشن", realestate: "املاک", digital: "دیجیتال" },
                    item: { filming: "فیلم‌برداری", photography: "عکاسی", drone: "پهپاد", tours: "تور مجازی ۳۶۰ / نقشه‌برداری", webdesign: "طراحی وب اختصاصی", development: "توسعه", presence: "حضور دیجیتال" }
                },
                hero: {
                    eyebrow: "استودیوی توسعه بصری کسب‌وکار",
                    title: "داستانی که کسب‌وکار شما<br>هنوز <em>روایت نکرده</em><br>را ثبت می‌کنیم.",
                    sub: "مادکسون ابزارهای بصری و دیجیتالی می‌سازد که املاک، برندها و کسب‌وکارها را جلو می‌برد — از فیلم‌های سینمایی املاک تا وب‌سایت‌هایی که میزبان آن‌ها هستند.",
                    cta1: "شروع پروژه",
                    cta2: "مشاهده نمونه‌کارها"
                },
                services: {
                    eyebrow: "خدمات ما",
                    title: "سه لنز. یک استودیو.",
                    s1: { title: "رسانه‌ی املاک", desc: "فیلم‌های سینمایی املاک، تصویربرداری هوایی با پهپاد، و تورهای مجازی ۳۶۰ درجه که آگهی‌ها را به مقصدهایی تبدیل می‌کند که مردم دوست دارند دوباره ببینند.", tag1: "تیزر سینمایی", tag2: "هوایی / پهپاد", tag3: "تور مجازی ۳۶۰ درجه" },
                    s2: { title: "تبلیغاتی و فشن", desc: "عکاسی و فیلم‌برداری آماده‌ی کمپین برای برندهایی که باید دقیقاً به همان خوبی که عملکردشان هست دیده شوند — در استودیو یا در لوکیشن.", tag1: "فیلم برند", tag2: "ادیتوریال فشن", tag3: "محتوای محصول" },
                    s3: { title: "زیرساخت دیجیتال", desc: "وب‌سایت‌های اختصاصی، مهندسی‌شده برای میزبانی هر چیزی که تولید می‌کنیم — سریع، مینیمال و ساخته‌شده برای تبدیل بازدیدکننده به مشتری.", tag1: "طراحی وب اختصاصی", tag2: "توسعه", tag3: "حضور دیجیتال" }
                },
                work: {
                    eyebrow: "فریم‌های منتخب",
                    title: "استودیویی بر پایه‌ی سه لنز،<br>در حرکت.",
                    f1: "املاک", f2: "فشن", f3: "هوایی", f4: "دیجیتال"
                },
                process: {
                    eyebrow: "استودیو",
                    title: "یک پروژه چطور در مادکسون پیش می‌رود.",
                    p1: { title: "بریف", desc: "پیش از برداشتن دوربین، کسب‌وکار، ملک یا برند شما را می‌شناسیم." },
                    p2: { title: "تصویربرداری", desc: "در لوکیشن یا استودیو — پوشش زمینی، هوایی و ۳۶۰ درجه در یک نشست." },
                    p3: { title: "تدوین", desc: "تدوین و رنگ‌آمیزی‌شده برای همان جایی که واقعاً دیده خواهد شد." },
                    p4: { title: "انتشار", desc: "تحویل به پلتفرم‌های شما — یا قرار گرفتن روی سایتی که برایش ساخته‌ایم." }
                },
                contact: {
                    eyebrow: "بسازیم",
                    title: "بگویید<br>چه می‌سازید.",
                    sub: "هر پروژه با یک گفت‌وگوی پنج‌دقیقه‌ای شروع می‌شود، نه یک پروپوزال سنگین."
                },
                footer: { contact: "تماس", meta: "© ۲۰۲۶ مادکسون — توسعه بصری کسب‌وکار" },
                pages: Object.assign({ samplesEyebrow: "نمونه‌کار" }, pagesI18nFa)
            }
        };

        function getNested(obj, path) {
            return path.split('.').reduce((o, k) => (o ? o[k] : undefined), obj);
        }

        function applyLanguage(lang) {
            const dict = translations[lang] || translations.en;

            document.querySelectorAll('[data-i18n]').forEach(el => {
                const val = getNested(dict, el.getAttribute('data-i18n'));
                if (val !== undefined) el.textContent = val;
            });

            document.querySelectorAll('[data-i18n-html]').forEach(el => {
                const val = getNested(dict, el.getAttribute('data-i18n-html'));
                if (val !== undefined) el.innerHTML = val;
            });

            document.documentElement.lang = lang;
            document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
            document.querySelectorAll('.lang-opt').forEach(opt => {
                opt.classList.toggle('is-active', opt.getAttribute('data-lang') === lang);
            });

            try { localStorage.setItem('madaxone-lang', lang); } catch (e) {}
        }

        function getInitialLanguage() {
            try {
                const saved = localStorage.getItem('madaxone-lang');
                if (saved === 'en' || saved === 'es' || saved === 'fa') return saved;
            } catch (e) {}
            const nav = (navigator.language || '').toLowerCase();
            if (nav.startsWith('es')) return 'es';
            if (nav.startsWith('fa')) return 'fa';
            return 'en';
        }

        let currentLang = getInitialLanguage();
        applyLanguage(currentLang);

        document.querySelectorAll('.lang-opt').forEach(btn => {
            btn.addEventListener('click', () => {
                currentLang = btn.getAttribute('data-lang');
                applyLanguage(currentLang);
            });
        });