import { listCollections } from "@lib/data/collections"

export const dynamic = "force-dynamic"

export default async function CollectionsTestPage(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  try {
    const { collections } = await listCollections({
      fields: "id, handle, title, metadata",
      limit: "100",
    })

    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Collections Test Page</h1>
        <div className="bg-gray-100 p-4 rounded">
          <p><strong>Country Code:</strong> {countryCode}</p>
          <p><strong>Collections Found:</strong> {collections?.length || 0}</p>
          
          {collections && collections.length > 0 ? (
            <div className="mt-4">
              <h2 className="font-semibold mb-2">Collections:</h2>
              <ul className="space-y-2">
                {collections.map((collection) => (
                  <li key={collection.id} className="bg-white p-2 rounded">
                    <strong>{collection.title}</strong> (handle: {collection.handle})
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-4 text-red-600">No collections found!</p>
          )}
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
        <div className="bg-red-100 p-4 rounded">
          <p>Error fetching collections: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    )
  }
}