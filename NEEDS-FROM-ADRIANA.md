# Pendientes de Adriana para terminar el sitio

El sitio está construido — estructura, diseño, contenido inicial, SEO,
formulario pre-armado, OG image, todo listo. Estas son las piezas que
sólo Adriana puede aportar antes de publicar.

---

## 1. Dominio y deploy — ✓ Casi listo

- **Dominio:** `csmexican.com` ✓ comprado, acceso disponible
- **Hosting:** GitHub Pages ✓ (gratis)
- [ ] **Configurar DNS** apuntando a GitHub Pages (4 registros A + 1
      CNAME — instrucciones en `README.md`, son ~5 minutos cuando
      tengamos el repo creado)

---

## 2. Datos de contacto a publicar

- **Correo público en el sitio:** `sales@csmexican.com` ✓
  (Adriana lo crea mañana — el sitio ya lo muestra)
- ~~**Dirección a publicar**~~ ✓ Resuelto — 1ra Cerrada de Galeana No. 11, San Ángel Inn, Álvaro Obregón, 01000, CDMX
- ~~**Teléfono**~~ ✓ Resuelto — +52 (55) 5295.1574
- [ ] **LinkedIn / redes sociales** (opcional — íconos en footer)

---

## 3. Correo destino del formulario

El formulario **ya está pre-armado** para los dos caminos más comunes
(Formspree o Netlify Forms). El JS detecta automáticamente cuál se
está usando — sólo hace falta **un cambio de URL** para activarlo.

- **Correo donde deben llegar los leads:** `sales@csmexican.com` ✓
- [ ] **Decisión de mecanismo:**
  - Servicio sencillo tipo **Formspree** (ideal para sitios estáticos
    en GitHub Pages, ~$5–10 USD/mes) — **recomendado**
  - O **webhook** si tiene un backend propio

> Como vamos con GitHub Pages, **Formspree es la opción más directa**.
> Netlify Forms sólo aplicaría si cambiáramos a Netlify de hosting.

Detalles de cómo activarlo están comentados directamente en el HTML,
junto al `<form>` — son ~30 segundos cuando llegue la decisión.

---

## 4. Logos de clientes — ~~¿se publican o no?~~ ✓ Resuelto

**Decisión:** No se usan logos. La sección muestra los nombres de las
marcas en tipografía limpia (sin logo, sin imagen). Esto evita el
problema de permisos y se ve elegante igual.

Marcas listadas actualmente:
Ki Gourmet · Gran Luchito · Sabor Mexicano · La Fundidora · Roland · El Cielo

- [ ] Confirmar con Adriana que esa es la lista correcta (orden /
      agregar / quitar marcas)

---

## 5. Números concretos de capacidad / producción

En el sitio actualmente decimos "flexible volumes — small batches to
large-scale runs", que es vago. Los compradores B2B premium quieren
números reales. **Si se pueden compartir:**

- [ ] **MOQ (minimum order quantity)** — botellas / unidades / kg
- [ ] **Capacidad mensual máxima**
- [ ] **Tiempo típico de R&D** (de brief a primera muestra)
- [ ] **Tiempo típico de production lead time** (de orden a embarque)

Aunque sean rangos ("entre X y Y unidades/mes") suman muchísimo a la
credibilidad. Si no se quieren publicar, lo dejamos como está.

---

## 6. Fotografías de banco (stock)

Marcados en el código con `data-needs-photo`. Los lugares que llevan foto:

- **Hero** — ingredientes mexicanos auténticos o piso de producción
- **About** — fachada o interior de la planta en CDMX
- **Products** — naturaleza muerta de 2-3 botellas con ingredientes
- **Logos de certificación** (3 propios + 4 que apoya): FSSC 22000,
  Women-Owned, HACCP, Non-GMO, B Corp, Fairtrade, USDA Organic — estos
  son recursos públicos de cada organización

Recomendación: **Adobe Stock** o **Getty Images** (~$10–30 USD por
imagen). Para el banco completo se necesitan ~5–8 fotos buenas.
Una vez tengamos las fotos las droppeo en `images/sections/`.

---

## ⚡ Lo que sí podemos hacer ya sin Adriana

- ~~Maquetar más detalles~~ ✓ Listo
- ~~Mejorar la responsive~~ ✓ Listo
- ~~Optimizar SEO~~ ✓ Listo — `sitemap.xml`, `robots.txt`, Open Graph
  + Twitter Card, JSON-LD Organization schema, OG image (1200×630),
  apple-touch-icon, canonical, hreflang scaffold.
- ~~Pre-stage del formulario~~ ✓ Listo — sólo falta el endpoint de Formspree.
- ~~Sección de clientes~~ ✓ Listo — texto en lugar de logos.
- ~~Scaffold para GitHub Pages~~ ✓ Listo — `.nojekyll`, `.gitignore`, README con
  instrucciones de DNS para cuando se compre el dominio.
- Construir versión en español si quiere (cotización aparte: +$1,500 MXN)

---

## Cuando lleguen los datos, son cambios chicos

Cada item pendiente es ~10 minutos de trabajo cuando llega la info.
Lo único que toma un poco más es el primer deploy a GitHub Pages (y
ese ya está documentado en `README.md`).
