public with sharing class MetadataUtility {
  public static String getSessionIdFromVFPage(PageReference visualforcePage) {
    String content = Test.IsRunningTest()
      ? 'Start_Of_Session_Id1234567890End_Of_Session_Id'
      : visualforcePage.getContent().toString();
    Integer s = content.indexOf('Start_Of_Session_Id') + 'Start_Of_Session_Id'.length();
    Integer e = content.indexOf('End_Of_Session_Id');
    return content.substring(s, e);
  }

  public static final List<String> PACKAGE_TYPES = new List<String>{ 'all', 'unmanagedOnly', 'managedOnly' };

  @AuraEnabled(cacheable=true)
  public static String getMetadataTypes() {
    MetadataService.MetadataPort service = createService();
    MetadataService.DescribeMetadataResult describeResult = service.describeMetadata(Integer.valueOf(API_VERSION));
    List<String> metadataTypeNames = new List<String>();
    for (MetadataService.DescribeMetadataObject metadataObject : describeResult.metadataObjects) {
      metadataTypeNames.add(metadataObject.xmlName);
      if (metadataObject.childXmlNames != null) {
        for (String childXmlName : metadataObject.childXmlNames) {
          if (childXmlName != null) {
            metadataTypeNames.add(childXmlName);
          }
        }
      }
    }

    metadataTypeNames.sort();
    List<MetadataSelector.KeyValuePair> toReturn = new List<MetadataSelector.KeyValuePair>();
    for (String metadataTypeName : metadataTypeNames) {
      toReturn.add(new MetadataSelector.KeyValuePair(metadataTypeName, metadataTypeName));
    }

    return JSON.serialize(toReturn);
  }

  public static final List<String> METADATA_TYPES = new List<String>{};

  @TestVisible
  private static String getSystemProperty(String category, String key, String defaultValue) {
    List<System_Property__mdt> records = [
      SELECT Id, Value__c
      FROM System_Property__mdt
      WHERE Category__c = :category AND Key__c = :key AND Is_Active__c = TRUE
      LIMIT 1
    ];

    if (records.size() > 0) {
      return records[0].Value__c;
    }

    return defaultValue;
  }

  private static MetadataService.MetadataPort createService() {
    MetadataService.MetadataPort service = new MetadataService.MetadataPort();
    service.SessionHeader = new MetadataService.SessionHeader_element();
    service.SessionHeader.sessionId = MetadataUtility.getSessionIdFromVFPage(Page.SessionId);
    return service;
  }

  private static final String SYSPROP_CATEGORY = 'PackBuild';
  private static final String SYSPROP_API_KEY = 'APIVersion';
  private static final String DEFAULT_APIVERSION = '56.0';
  public static final String API_VERSION = getSystemProperty(SYSPROP_CATEGORY, SYSPROP_API_KEY, DEFAULT_APIVERSION);
}
