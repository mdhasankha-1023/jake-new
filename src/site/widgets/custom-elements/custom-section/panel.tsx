import React, { type FC, useState, useEffect, useCallback } from 'react';
import { widget } from '@wix/editor';
import {
  SidePanel,
  WixDesignSystemProvider,
  Input,
  FormField,
  SectionHelper,
  Divider,
  Text,
  Box,
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';

const SITE_WIDGETS_DOCS = 'https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/wix-cli/supported-extensions/site-extensions/site-widgets/site-widget-extension-files-and-code';

const Panel: FC = () => {
  const [displayName, setDisplayName] = useState<string>('');
  
  // Card States
  const [cardTitle1, setCardTitle1] = useState<string>('');
  const [cardDesc1, setCardDesc1] = useState<string>('');
  const [cardTitle2, setCardTitle2] = useState<string>('');
  const [cardDesc2, setCardDesc2] = useState<string>('');
  const [cardTitle3, setCardTitle3] = useState<string>('');
  const [cardDesc3, setCardDesc3] = useState<string>('');
  const [cardTitle4, setCardTitle4] = useState<string>('');
  const [cardDesc4, setCardDesc4] = useState<string>('');

  // 1. Fetch all properties from the Wix Editor on load
  useEffect(() => {
    widget.getProp('display-name').then(val => setDisplayName(val));
    widget.getProp('cardTitle1').then(val => setCardTitle1(val));
    widget.getProp('cardDesc1').then(val => setCardDesc1(val));
    widget.getProp('cardTitle2').then(val => setCardTitle2(val));
    widget.getProp('cardDesc2').then(val => setCardDesc2(val));
    widget.getProp('cardTitle3').then(val => setCardTitle3(val));
    widget.getProp('cardDesc3').then(val => setCardDesc3(val));
    widget.getProp('cardTitle4').then(val => setCardTitle4(val));
    widget.getProp('cardDesc4').then(val => setCardDesc4(val));
  }, []);

  // 2. Optimized save handlers
  const updateProp = (propName: string, value: string, setter: (v: string) => void) => {
    setter(value);
    widget.setProp(propName, value);
  };

  return (
    <WixDesignSystemProvider>
      <SidePanel width="300" height="100vh">
        <SidePanel.Content noPadding stretchVertically>
          <SidePanel.Field>
            <FormField label="Main Widget Title">
              <Input value={displayName} onChange={(e) => updateProp('display-name', e.target.value, setDisplayName)} />
            </FormField>
          </SidePanel.Field>

          <Divider />

          {/* Card 1 */}
          <Box padding="16px 0 8px 0"><Text weight="bold" size="medium">Card 1</Text></Box>
          <SidePanel.Field>
            <FormField label="Title"><Input value={cardTitle1} onChange={(e) => updateProp('cardTitle1', e.target.value, setCardTitle1)} /></FormField>
          </SidePanel.Field>
          <SidePanel.Field>
            <FormField label="Description"><Input value={cardDesc1} onChange={(e) => updateProp('cardDesc1', e.target.value, setCardDesc1)} /></FormField>
          </SidePanel.Field>

          <Divider />

          {/* Card 2 */}
          <Box padding="16px 0 8px 0"><Text weight="bold" size="medium">Card 2</Text></Box>
          <SidePanel.Field>
            <FormField label="Title"><Input value={cardTitle2} onChange={(e) => updateProp('cardTitle2', e.target.value, setCardTitle2)} /></FormField>
          </SidePanel.Field>
          <SidePanel.Field>
            <FormField label="Description"><Input value={cardDesc2} onChange={(e) => updateProp('cardDesc2', e.target.value, setCardDesc2)} /></FormField>
          </SidePanel.Field>

          <Divider />

          {/* Card 3 */}
          <Box padding="16px 0 8px 0"><Text weight="bold" size="medium">Card 3</Text></Box>
          <SidePanel.Field>
            <FormField label="Title"><Input value={cardTitle3} onChange={(e) => updateProp('cardTitle3', e.target.value, setCardTitle3)} /></FormField>
          </SidePanel.Field>
          <SidePanel.Field>
            <FormField label="Description"><Input value={cardDesc3} onChange={(e) => updateProp('cardDesc3', e.target.value, setCardDesc3)} /></FormField>
          </SidePanel.Field>

          <Divider />

          {/* Card 4 */}
          <Box padding="16px 0 8px 0"><Text weight="bold" size="medium">Card 4</Text></Box>
          <SidePanel.Field>
            <FormField label="Title"><Input value={cardTitle4} onChange={(e) => updateProp('cardTitle4', e.target.value, setCardTitle4)} /></FormField>
          </SidePanel.Field>
          <SidePanel.Field>
            <FormField label="Description"><Input value={cardDesc4} onChange={(e) => updateProp('cardDesc4', e.target.value, setCardDesc4)} /></FormField>
          </SidePanel.Field>

        </SidePanel.Content>

        <SidePanel.Footer noPadding>
          <SectionHelper fullWidth appearance="success" border="topBottom">
            Learn more about <a href={SITE_WIDGETS_DOCS} target="_blank" rel="noopener noreferrer">Site Widgets</a>
          </SectionHelper>
        </SidePanel.Footer>
      </SidePanel>
    </WixDesignSystemProvider>
  );
};

export default Panel;