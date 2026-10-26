import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, Text, useTheme } from 'react-native-paper';
import { useLessonDisplay } from '../store/lessonDisplay';
export function LessonSummarySettings() {
  const { i18n } = useTranslation(); const theme = useTheme(); const fr = i18n.language.startsWith('fr');
  const mode = useLessonDisplay((s) => s.mode); const setMode = useLessonDisplay((s) => s.setMode);
  const [visible, setVisible] = useState(false);
  const title = fr ? 'Affichage des leçons' : 'Lesson display';
  const labels = fr ? { full: 'Texte intégral', summary: 'Résumé', both: 'Les deux' } : { full: 'Full text', summary: 'Summary', both: 'Both' };
  return <>
    <Pressable accessibilityRole='button' accessibilityLabel={`${title}. ${labels[mode]}`} onPress={() => setVisible(true)} style={({ pressed }) => [styles.row, pressed && { opacity: 0.75 }]}>
      <View style={styles.grow}><Text variant='bodyLarge'>{title}</Text><Text variant='bodySmall' style={{ color: theme.colors.onSurfaceVariant }}>{labels[mode]}</Text></View><Text accessible={false}>›</Text>
    </Pressable>
    <Portal><Dialog visible={visible} onDismiss={() => setVisible(false)}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.ScrollArea><ScrollView contentContainerStyle={styles.options}>
        <Text>{fr ? 'Les résumés sont disponibles en français uniquement. En anglais ou sans résumé, le texte intégral reste affiché.' : 'Summaries are available in French only. English lessons and lessons without a summary continue to show the full text.'}</Text>
        {(['full', 'summary', 'both'] as const).map((value) => <Button key={value} mode={mode === value ? 'contained' : 'outlined'} accessibilityState={{ selected: mode === value }} onPress={() => setMode(value)}>{labels[value]}</Button>)}
        <Text variant='bodySmall'>{fr ? 'Les deux : résumé puis texte intégral. La narration audio suit uniquement le texte intégral ; elle est masquée en mode Résumé seul.' : 'Both shows the summary before the full text. Audio follows the full text only and is hidden in summary-only mode.'}</Text>
      </ScrollView></Dialog.ScrollArea>
      <Dialog.Actions><Button onPress={() => setVisible(false)}>{fr ? 'Fermer' : 'Close'}</Button></Dialog.Actions>
    </Dialog></Portal>
  </>;
}
const styles = StyleSheet.create({ row: { minHeight: 56, flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 }, grow: { flex: 1, gap: 3 }, options: { gap: 12, paddingVertical: 16 } });
