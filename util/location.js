const MAPBOX_API_KEY = "0af46c60ba6d4a3ca8912bda6d9442b3";
const ZOOM = 14;
export function getMapPreview(lat, lon) {
	const imagePreviewUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=404&center=lonlat:${lon},${lat}&zoom=${ZOOM}&marker=lonlat:${lon},${lat};type:material;color:%23ff3421;size:large;icontype:awesome&apiKey=${MAPBOX_API_KEY}`;

	return imagePreviewUrl;
}
