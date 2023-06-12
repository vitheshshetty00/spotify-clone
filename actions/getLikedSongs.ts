import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getlikedSongs = async (): Promise<Song[]> => {
	const supabase = createServerComponentClient({
		cookies: cookies,
	});

	const {
		data: sessionData
	} = await supabase.auth.getSession();

	const { data, error } = await supabase
		.from("liked_songs")
		.select("*,songs(*)")
		.eq('user_id', sessionData?.session?.user?.id)
		.order("created_at", { ascending: false });

	if (error) {
		console.log(error);
		return [];
	}
	if(!data){
		return [];
	} 

	return data.map((item) => ({
		...item.songs
	}))

	return (data as any) || [];
};

export default getlikedSongs;
