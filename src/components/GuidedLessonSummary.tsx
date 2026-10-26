import { useState } from 'react';
import { Alert, Linking, StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import type { GuidedBlock, GuidedSummary } from '../content/guidedSummaries';
import { Panel } from './Panel';

interface Props {
  summary: GuidedSummary;
  textScale: number;
  canOpenPassage: (source: string) => boolean;
  onOpenPassage: (source: string) => void;
  onReadSummary: () => void;
}
export function GuidedLessonSummary({ summary, textScale, canOpenPassage, onOpenPassage, onReadSummary }: Props) {
  const theme = useTheme();
  const [contextOpen, setContextOpen] = useState(false);
  const size = 17 * textScale;
  const body = { fontSize: size, lineHeight: size * 1.6 };
  const label = { fontSize: 18 * textScale, lineHeight: 27 * textScale, fontWeight: '700' as const };
  const sourceLink = (source: string) => canOpenPassage(source)
    ? <Button compact onPress={() => onOpenPassage(source)} accessibilityLabel='Lire le passage correspondant dans le texte intégral'>Lire le passage</Button>
    : null;
  const openOfficialSource = (url: string) => {
    void Linking.openURL(url).catch(() => Alert.alert('Lien indisponible', 'Impossible d’ouvrir la source officielle. Réessayez plus tard.'));
  };
  const renderBlock = (block: GuidedBlock) => <Panel key={block.id}>
    <Text accessibilityRole='header' style={label}>{block.title}</Text>
    <View style={block.kind === 'places' ? styles.places : styles.items}>
      {block.items.map((item, index) => <View key={item.id} style={[
        styles.item,
        block.kind === 'timeline' && [styles.timeline, { borderLeftColor: theme.colors.secondary }],
        block.kind === 'places' && styles.place,
      ]}>
        {block.kind === 'steps' ? <Text style={[body, { color: theme.colors.secondary }]}>Étape {index + 1}</Text> : null}
        {block.kind === 'people' ? <Text style={{ color: theme.colors.onSurfaceVariant }}>Personne ou équipe</Text> : null}
        <Text selectable style={[label, block.kind === 'facts' && { fontSize: 22 * textScale, lineHeight: 32 * textScale, color: theme.colors.secondary }]}>{item.label}</Text>
        {block.kind === 'places' ? <Text style={{ color: theme.colors.onSurfaceVariant }}>Capitale</Text> : null}
        <Text selectable style={body}>{item.detail}</Text>
        {item.context ? <Text selectable style={[body, { color: theme.colors.onSurfaceVariant }]}>{item.context}</Text> : null}
        {sourceLink(item.source)}
      </View>)}
    </View>
  </Panel>;
  return <View style={styles.wrap}>
    <Text accessibilityRole='header' variant='titleLarge'>Résumé — comprendre et retenir</Text>
    <Text variant='bodySmall'>La narration suit le texte intégral, pas ce résumé. Lire cette fiche ne valide pas la leçon.</Text>
    <Panel>
      <Text accessibilityRole='header' style={label}>1. Comprendre</Text>
      {summary.intro.map((paragraph, i) => <Text key={i} selectable style={body}>{paragraph}</Text>)}
    </Panel>
    <Text accessibilityRole='header' variant='titleLarge'>2. Retenir</Text>
    {summary.blocks.map(renderBlock)}
    {summary.distinctions.length ? <>
      <Text accessibilityRole='header' variant='titleLarge'>3. Distinguer</Text>
      {summary.distinctions.map((pair) => <Panel key={pair.id}>
        <View style={styles.compare}>
          {[pair.left, pair.right].map((side, index) => <View key={index} style={[styles.side, { borderColor: theme.colors.outlineVariant }]}>
            <Text selectable style={label}>{side.label}</Text><Text selectable style={body}>{side.detail}</Text>
          </View>)}
        </View>
      </Panel>)}
    </> : null}
    {summary.notes.length ? <Panel>
      <Text accessibilityRole='header' style={label}>Contexte et sources</Text>
      {summary.notes.map((note, index) => <Text key={index} style={body}>{note.label}</Text>)}
      <Button accessibilityState={{ expanded: contextOpen }} onPress={() => { onReadSummary(); setContextOpen(!contextOpen); }}>{contextOpen ? 'Masquer les précisions' : 'Afficher les précisions'}</Button>
      {contextOpen ? summary.notes.map((note, index) => <View key={index} style={styles.item}>
        <Text style={label}>{note.label}</Text><Text selectable style={body}>{note.detail}</Text>
        {note.url ? <Button accessibilityLabel={`Ouvrir la source officielle : ${note.label}`} onPress={() => openOfficialSource(note.url!)}>Source officielle — site externe</Button> : null}
      </View>) : null}
    </Panel> : null}
  </View>;
}
const styles = StyleSheet.create({
  wrap: { gap: 12, marginBottom: 18 }, items: { gap: 14 }, item: { gap: 5, paddingVertical: 8 },
  timeline: { borderLeftWidth: 3, paddingLeft: 14 }, places: { gap: 14 }, place: { gap: 3 },
  compare: { gap: 10 }, side: { gap: 5, borderWidth: 1, borderRadius: 10, padding: 12 },
});
