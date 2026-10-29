import React from 'react';
import { Text } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '../src/context';
import { Screen, RequireAccount, useStyles, useResource, Busy, ErrorBox, Empty, ProjectCard, Button } from '../src/ui';
function Watchlist() { const s = useStyles(); const { api } = useApp(); const result = useResource(api.watchlist); return <><Button title="← Back to discovery" secondary onPress={() => router.push('/')}/><Text style={[s.eyebrow, { marginTop: 30 }]}>YOUR WATCHLIST</Text><Text style={s.title}>Keep a good{"\n"}idea close.</Text><Text style={[s.body, { marginBottom: 25 }]}>Following expresses interest. It is never an investment.</Text>{result.loading ? <Busy/> : result.error ? <ErrorBox message={result.error} retry={result.reload}/> : !result.data?.length ? <Empty title="What catches your curiosity?">Save projects from their public pages to keep them here.</Empty> : result.data.map(p => <ProjectCard key={p.id} project={p}/>)}</>; }
export default function WatchlistScreen() { return <Screen><RequireAccount><Watchlist/></RequireAccount></Screen>; }
