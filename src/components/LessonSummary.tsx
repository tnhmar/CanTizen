import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import type { SummarySection } from '../content/lessonSummaries';
import { Panel } from './Panel';
const labels: Record<string, string> = {
  essentials: 'L’essentiel', method: 'Méthode de révision', definitions: 'Mots et notions',
  people: 'Personnes et institutions', numbers: 'Chiffres à retenir', dates: 'Dates et repères',
  rights: 'Droits', responsibilities: 'Responsabilités', compare: 'Bien distinguer',
  remember: 'À mémoriser', geography: 'Lieux et capitales', steps: 'Étapes dans l’ordre',
  symbols: 'Symboles', caution: 'Contexte et prudence',
};
export function LessonSummary({ sections, textScale }: { sections: SummarySection[]; textScale: number }) {
  const theme = useTheme();
  const size = 17 * textScale;
  return <View style={styles.wrap}>
    <Text accessibilityRole='header' variant='titleLarge'>Résumé — points à mémoriser</Text>
    <Text variant='bodySmall' style={{ color: theme.colors.onSurfaceVariant }}>Synthèse du contenu français fourni. Elle ne remplace ni la leçon complète ni les instructions officielles à jour. Lire un résumé ne valide pas la leçon.</Text>
    {sections.map((section, index) => <Panel key={`${section.type}-${index}`}>
      <Text accessibilityRole='header' variant='titleMedium' style={{ color: section.type === 'caution' ? theme.colors.onSurfaceVariant : theme.colors.secondary }}>{labels[section.type] ?? 'À retenir'}</Text>
      {section.items.map((item, i) => <View key={i} style={styles.row}>
        <Text accessible={false} style={{ fontSize: size, lineHeight: size * 1.6 }}>•</Text>
        <Text selectable style={{ flex: 1, fontSize: size, lineHeight: size * 1.6 }}>{item}</Text>
      </View>)}
    </Panel>)}
  </View>;
}
const styles = StyleSheet.create({ wrap: { gap: 12, marginBottom: 18 }, row: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 } });
