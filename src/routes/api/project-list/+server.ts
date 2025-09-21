import type {ListingResult} from "$lib/apis/listing-result";
import type {ProjectEntry} from "$lib/apis/project-entry";

function process(code: number, json: string) : ListingResult<ProjectEntry>
{
    if(code === 404)
        return {
            msg: "Host backend is misconfigured! 😵"
        };

    const result = JSON.parse(json);
    return {
        results: result,
    };
}

export async function GET() {

    const src = "https://gist.githubusercontent.com/appleneko2001/" +
        "e1e7eca1c8921b9d914d4b80a4948a15/raw/" +
        //"1bb48b107902ef7100e3a793a1ccf98bc66e327a/" +  // revision id
        "project_listing.json";

    const result = await fetch(src);

    return Response.json(process(result.status, await result.text()));
}